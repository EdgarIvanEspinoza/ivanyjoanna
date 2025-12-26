import { NextRequest, NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const S3_BUCKET = process.env.S3_BUCKET || 'ivan-joanna-wedding-photos';
const S3_REGION = process.env.S3_REGION || 'us-east-1';
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region: S3_REGION,
  credentials: S3_ACCESS_KEY_ID && S3_SECRET_ACCESS_KEY ? {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  } : undefined,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '60', 10);

  try {
    // Obtener TODOS los objetos de una vez (más eficiente que múltiples llamadas)
    let allObjects: any[] = [];
    let continuationToken: string | undefined = undefined;

    do {
      const command: ListObjectsV2Command = new ListObjectsV2Command({
        Bucket: S3_BUCKET,
        ContinuationToken: continuationToken,
      });

      const response = await s3.send(command);
      allObjects = allObjects.concat(response.Contents || []);
      continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    // Separar originales de thumbnails
    const originals = allObjects.filter(
      obj => obj.Key && !obj.Key.endsWith('-thumb.jpg') && !obj.Key.endsWith('/')
    );

    const thumbsMap = new Map();
    allObjects.forEach(obj => {
      if (obj.Key && obj.Key.endsWith('-thumb.jpg')) {
        const originalKey = obj.Key.replace(/-thumb\.jpg$/, '.jpg');
        thumbsMap.set(originalKey, obj);
      }
    });

    // Calcular el rango de la página
    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const pageOriginals = originals.slice(startIdx, endIdx);

    // Combinar originales con sus thumbnails
    const files = [];
    for (const original of pageOriginals) {
      files.push({
        key: original.Key,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${original.Key}`,
        lastModified: original.LastModified,
        size: original.Size,
      });

      // Agregar thumbnail si existe
      const thumb = thumbsMap.get(original.Key);
      if (thumb) {
        files.push({
          key: thumb.Key,
          url: `https://${S3_BUCKET}.s3.amazonaws.com/${thumb.Key}`,
          lastModified: thumb.LastModified,
          size: thumb.Size,
        });
      }
    }

    return NextResponse.json({
      files,
      page,
      pageSize,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to list S3 objects', details: error?.message }, { status: 500 });
  }
}
