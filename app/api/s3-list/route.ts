import { NextRequest, NextResponse } from 'next/server';
import {
  getS3BucketName,
  isS3CredentialError,
  listObjectsPage,
  S3_UNAVAILABLE_MESSAGE,
} from '@/lib/server/s3';

export async function GET(req: NextRequest) {
  const bucketName = getS3BucketName();
  const { searchParams } = new URL(req.url);
  const after = searchParams.get('after') || undefined;
  const pageSize = Math.min(
    Math.max(parseInt(searchParams.get('pageSize') || '60', 10) || 60, 1),
    120
  );

  if (!bucketName) {
    return NextResponse.json({ error: 'S3_BUCKET no configurado' }, { status: 500 });
  }

  try {
    const pageOriginals = [];
    const thumbsMap = new Map();
    let nextCursor: string | null = null;
    let hasMore = false;
    let startAfter = after;

    while (pageOriginals.length < pageSize) {
      const response = await listObjectsPage({
        startAfter,
        maxKeys: Math.min(pageSize * 4, 1000),
      });
      const objects = response.Contents || [];

      if (objects.length === 0) {
        break;
      }

      let processedIndex = -1;

      for (const obj of objects) {
        processedIndex += 1;

        if (!obj.Key || obj.Key.endsWith('/')) {
          continue;
        }

        nextCursor = obj.Key;

        if (obj.Key.endsWith('-thumb.jpg')) {
          const originalKey = obj.Key.replace(/-thumb\.jpg$/, '.jpg');
          thumbsMap.set(originalKey, obj);
          continue;
        }

        pageOriginals.push(obj);

        if (pageOriginals.length === pageSize) {
          hasMore = processedIndex < objects.length - 1 || Boolean(response.IsTruncated);
          break;
        }
      }

      if (pageOriginals.length === pageSize) {
        break;
      }

      if (!response.IsTruncated) {
        nextCursor = null;
        hasMore = false;
        break;
      }

      startAfter = nextCursor || startAfter;
      hasMore = true;
    }

    // Combinar originales con sus thumbnails
    const files = [];
    for (const original of pageOriginals) {
      files.push({
        key: original.Key,
        url: `https://${bucketName}.s3.amazonaws.com/${original.Key}`,
        lastModified: original.LastModified,
        size: original.Size,
      });

      // Agregar thumbnail si existe
      const thumb = thumbsMap.get(original.Key);
      if (thumb) {
        files.push({
          key: thumb.Key,
          url: `https://${bucketName}.s3.amazonaws.com/${thumb.Key}`,
          lastModified: thumb.LastModified,
          size: thumb.Size,
        });
      }
    }

    return NextResponse.json({
      files,
      pageSize,
      nextCursor,
      hasMore,
    });
  } catch (error: any) {
    if (isS3CredentialError(error)) {
      console.warn('S3 professional gallery unavailable due to invalid credentials.');
      return NextResponse.json(
        {
          unavailable: true,
          files: [],
          pageSize,
          nextCursor: null,
          hasMore: false,
          error: S3_UNAVAILABLE_MESSAGE,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: 'Failed to list S3 objects', details: error?.message }, { status: 500 });
  }
}
