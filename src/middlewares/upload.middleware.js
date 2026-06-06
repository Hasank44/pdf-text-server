import multer from "multer";
import path from "path";
import { env } from "../config/env.js";
import { ensureUploadDir } from "../utils/file.utils.js";

ensureUploadDir(env.uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, env.uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const isPdf =
        file.mimetype === "application/pdf" ||
        path.extname(file.originalname).toLowerCase() === ".pdf";
    if (!isPdf) {
        return cb(new Error("Only PDF files are allowed"), false);
    };
    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
});
