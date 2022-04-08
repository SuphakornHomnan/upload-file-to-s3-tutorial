import { NextFunction, Request, Response } from "express";
import { minioClient } from "../config/minio.config";

export const existBucket = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bucketExists = await minioClient.bucketExists(
      process.env.BUCKET_NAME
    );

    if (!bucketExists) {
      await minioClient.makeBucket(process.env.BUCKET_NAME, process.env.REGION);
    }
    next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      status: 500,
    });
  }
};
