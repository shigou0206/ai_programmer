// aws-config.js
import AWS from 'aws-sdk';

// 配置 AWS SDK
AWS.config.update({
  region: 'your-region', // 替换为你的 AWS 区域
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'your-identity-pool-id', // 替换为你的 Cognito Identity Pool ID
  }),
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: 'your-bucket-name' }, // 替换为你的 S3 桶名称
});

export const getSignedUrl = (key) => {
  const params = {
    Bucket: 'your-bucket-name', // 替换为你的 S3 桶名称
    Key: key,
    Expires: 60, // 链接的过期时间（秒）
  };
  return s3.getSignedUrl('getObject', params);
};
