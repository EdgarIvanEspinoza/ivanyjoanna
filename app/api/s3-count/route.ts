import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";
import {
  getS3BucketName,
  isS3CredentialError,
  listObjectsPage,
  S3_UNAVAILABLE_MESSAGE,
} from "@/lib/server/s3";

async function countOriginalS3Objects() {
  let count = 0;
  let continuationToken: string | undefined = undefined;

  do {
    const response = await listObjectsPage({ continuationToken });

    const originals = (response.Contents || []).filter(
      (obj) => obj.Key && !obj.Key.endsWith("-thumb.jpg") && !obj.Key.endsWith("/")
    );
    count += originals.length;

    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  return count;
}

export async function GET() {
  try {
    const bucketName = getS3BucketName();
    if (!bucketName) {
      return NextResponse.json(
        { error: "S3_BUCKET no configurado" },
        { status: 500 }
      );
    }

    const getCachedCount = unstable_cache(
      () => countOriginalS3Objects(),
      ["s3-total-count", bucketName],
      { revalidate: 600 }
    );

    const count = await getCachedCount();

    return NextResponse.json({ totalCount: count });
  } catch (error) {
    if (isS3CredentialError(error)) {
      console.warn("S3 professional gallery unavailable due to invalid credentials.");
      return NextResponse.json(
        {
          unavailable: true,
          totalCount: 0,
          error: S3_UNAVAILABLE_MESSAGE,
        },
        { status: 503 }
      );
    }

    console.error("Error al contar objetos en S3:", error);
    return NextResponse.json(
      { error: "Error al contar objetos" },
      { status: 500 }
    );
  }
}
