import fs from "fs";
import path from "path";

export const deleteFile = async filePath => {
    try {
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.warn("File delete failed:", err.message);
    };
};
export const ensureUploadDir = dirPath => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    };
};
