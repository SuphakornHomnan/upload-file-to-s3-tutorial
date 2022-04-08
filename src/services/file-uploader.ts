import axios from "axios";
import { Request, Response } from "express";
import { minioClient } from "../config/minio.config";

const metaData = {
  "Content-Type": "application/octet-stream",
  "X-Amz-Meta-Testing": 1234,
  example: 5678,
};

function genFileName(length: number) {
  var result: string = "";
  var characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength: number = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const fileUpload = async (req: Request, res: Response) => {
  try {
    const { url, mimeType } = req.body;

    const file = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const bufferFile: Buffer = Buffer.from(file.data, "utf-8");
    const fileName: string = `${genFileName(13)}.${mimeType}`;
    await minioClient.putObject(
      process.env.BUCKET_NAME,
      fileName,
      bufferFile,
      metaData
    );
    return res.send("Upload file success. This is your file name: " + fileName);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      status: 500,
    });
  }
};
