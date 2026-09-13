import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

const DEFAULT_REGION = "us-east-1";
const INVALID_CREDENTIAL_CODES = new Set([
  "InvalidAccessKeyId",
  "SignatureDoesNotMatch",
  "InvalidToken",
  "ExpiredToken",
  "TokenRefreshRequired",
  "AccessDenied",
  "Unauthorized",
]);

const region = process.env.S3_REGION || DEFAULT_REGION;
const configuredBucket = process.env.S3_BUCKET || process.env.S3_BUCKET_NAME;
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const hasConfiguredCredentials = Boolean(accessKeyId && secretAccessKey);

const authenticatedClient = new S3Client({
  region,
  credentials: hasConfiguredCredentials
    ? {
        accessKeyId: accessKeyId!,
        secretAccessKey: secretAccessKey!,
      }
    : undefined,
});

const anonymousClient = new S3Client({ region });

export const S3_UNAVAILABLE_MESSAGE =
  "La galeria profesional esta temporalmente no disponible.";

export function getS3BucketName() {
  return configuredBucket;
}

export function getS3Region() {
  return region;
}

export function isS3CredentialError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const errorCode = "Code" in error ? error.Code : undefined;
  const errorName = "name" in error ? error.name : undefined;
  const metadata = "$metadata" in error ? error.$metadata : undefined;
  const httpStatusCode =
    metadata && typeof metadata === "object" && "httpStatusCode" in metadata
      ? metadata.httpStatusCode
      : undefined;

  return (
    (typeof errorCode === "string" && INVALID_CREDENTIAL_CODES.has(errorCode)) ||
    (typeof errorName === "string" && INVALID_CREDENTIAL_CODES.has(errorName)) ||
    httpStatusCode === 401 ||
    httpStatusCode === 403
  );
}

export async function listObjectsPage(options?: {
  continuationToken?: string;
  startAfter?: string;
  maxKeys?: number;
}) {
  if (!configuredBucket) {
    throw new Error("S3_BUCKET no configurado");
  }

  const command = new ListObjectsV2Command({
    Bucket: configuredBucket,
    ContinuationToken: options?.continuationToken,
    StartAfter: options?.startAfter,
    MaxKeys: options?.maxKeys,
  });

  try {
    return await authenticatedClient.send(command);
  } catch (error) {
    if (!hasConfiguredCredentials || !isS3CredentialError(error)) {
      throw error;
    }

    console.warn(
      "Falling back to anonymous S3 access after configured credentials were rejected."
    );

    return anonymousClient.send(command);
  }
}