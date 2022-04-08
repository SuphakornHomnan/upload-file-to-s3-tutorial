import { Client } from "minio";
import { config } from "dotenv";
config();

export const minioClient = new Client({
  endPoint: process.env.END_POINT,
  port: parseInt(process.env.S3_PORT),
  useSSL: true,
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
});
