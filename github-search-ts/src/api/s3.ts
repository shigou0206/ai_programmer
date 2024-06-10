import AWS from 'aws-sdk';

const S3_BUCKET_NAME = 'your-s3-bucket-name';
const S3_REGION = 'your-s3-region';

AWS.config.update({
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
  region: S3_REGION,
});

const sts = new AWS.STS();

export const getTemporaryCredentials = async () => {
  const params = {
    DurationSeconds: 3600, // Credentials valid for 1 hour
  };
  const data = await sts.getSessionToken(params).promise();
  return data.Credentials;
};

export const getSignedUrl = async (s3Key: string): Promise<string> => {
  const credentials = await getTemporaryCredentials();
  if (!credentials) {
    throw new Error('Failed to obtain temporary credentials');
  }

  const s3Client = new AWS.S3({
    accessKeyId: credentials.AccessKeyId,
    secretAccessKey: credentials.SecretAccessKey,
    sessionToken: credentials.SessionToken,
    region: S3_REGION,
  });

  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: s3Key,
    Expires: 1800, // 30 minutes
  };
  return s3Client.getSignedUrl('getObject', params);
};
