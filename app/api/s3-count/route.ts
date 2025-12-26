import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.S3_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    const bucketName = process.env.S3_BUCKET;
    if (!bucketName) {
      return NextResponse.json(
        { error: "S3_BUCKET no configurado" },
        { status: 500 }
      );
    }

    let count = 0;
    let continuationToken: string | undefined = undefined;

    // Iterar sobre todos los objetos para contar solo los originales (no thumbnails)
    do {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        ContinuationToken: continuationToken,
      });

      const response = await s3Client.send(command);
      
      // Contar solo archivos que NO son thumbnails
      const originals = (response.Contents || []).filter(
        (obj) => !obj.Key?.endsWith("-thumb.jpg")
      );
      count += originals.length;

      continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    return NextResponse.json({ totalCount: count });
  } catch (error) {
    console.error("Error al contar objetos en S3:", error);
    return NextResponse.json(
      { error: "Error al contar objetos" },
      { status: 500 }
    );
  }
}
