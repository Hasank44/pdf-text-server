import mime from "mime-types";
import { APP_CONSTANTS } from "../constants/app.constants.js";

export const validatePdfFile = file => {
    if (!file) {
        throw new Error("No file uploaded");
    };
    const allowedMime = APP_CONSTANTS.ALLOWED_MIME_TYPES;
    const detectedMime = mime.lookup(file.originalname);
    const isValidMime = allowedMime.includes(file.mimetype) || allowedMime.includes(detectedMime);
    if (!isValidMime) {
        throw new Error("Invalid file type. Only PDF allowed.");
    };
    if (file.size > APP_CONSTANTS.MAX_FILE_SIZE) {
        throw new Error("File too large. Max 10MB allowed.");
    };
    if (!file.originalname.toLowerCase().endsWith(".pdf")) {
        throw new Error("Invalid extension. PDF required.");
    };
    return true;
};
