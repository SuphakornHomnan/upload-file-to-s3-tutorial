import express, { Express } from "express";
import { existBucket } from "./middlewares/check-exist-bucket";
import { fileUpload } from "./services/file-uploader";
import { config } from "dotenv";

async function main() {
  config();
  const app: Express = express();
  app.use(express.json());
  app.post("/", existBucket, fileUpload);

  app.listen(process.env.PORT, () =>
    console.log("Test upload file in minio server is launching...")
  );
}

main();
