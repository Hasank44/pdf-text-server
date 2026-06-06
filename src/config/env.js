import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  maxFileSize: Number(process.env.MAX_FILE_SIZE),
  uploadDir: process.env.UPLOAD_DIR,
  requestTimeout: Number(process.env.REQUEST_TIMEOUT),
};