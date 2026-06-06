import { PdfService } from "./pdfService.js";

export class ExtractionService {
    constructor() {
        this.pdf = new PdfService();
    };

    async extract(filePath, mode = "plain") {
        const result = await this.pdf.extract(filePath);
        if (mode === "plain") {
            return this.toPlain(result);
        };
        if (mode === "block") {
            return this.toBlock(result);
        };
        if (mode === "json") {
            return this.toJson(result);
        };
        throw new Error("Invalid extraction mode");
    };

    toPlain(data) {
        let text = "";
        for (const page of data.pages) {
            if (page.source === "pdfjs") {
                text += page.blocks ? page.blocks.map(b => b.text).join(" ") : "";
            };
            if (page.source === "ocr") {
                text += page.blocks ? page.blocks.map(b => b.text).join(" ") : "";
            };
            text += "\n";
        };
        return {
            mode: "plain",
            text: text.trim(),
        };
    };

    toBlock(data) {
        const blocks = [];
        for (const page of data.pages) {
            blocks.push(...(page.blocks || []));
        };
        return {
            mode: "block",
            blocks,
        };
    };

    toJson(data) {
        return {
            mode: "json",
            pages: data.pages,
        };
    };
};
