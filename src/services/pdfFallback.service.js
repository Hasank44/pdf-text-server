import pdf from "pdf-parse";
import fs from "fs";

export class PdfFallbackService {
    async extract(filePath) {
        const buffer = fs.readFileSync(filePath);
        const data = await pdf(buffer);
        const text = data.text.replace(/\s+/g, " ").trim();
        return {
            text,
            pages: data.numpages,
            info: data.info,
        };
    };
};
