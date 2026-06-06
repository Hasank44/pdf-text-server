import path from "path";
import { v4 as uuidv4 } from "uuid";
import { env } from "../config/env.js";

export const generateFilePath = file => {
    const uniqueName = `${uuidv4()}-${Date.now()}.pdf`;
    const fullPath = path.join(env.uploadDir, uniqueName);
    return {
        filePath: fullPath,
        fileName: uniqueName,
    };
};
