import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export class PdfEngineService {
    async loadDocument(filePath) {
        const pdfBuffer = fs.readFileSync(filePath);

        const loadingTask = pdfjsLib.getDocument({
            data: new Uint8Array(pdfBuffer),
        });

        return await loadingTask.promise;
    };

    async extractPageText(page) {
        const textContent = await page.getTextContent();

        return textContent.items.map(item => ({
            text: item.str,
            x: item.transform[4],
            y: item.transform[5],
            width: item.width,
            height: item.height,
            fontSize: item.height || 0,
        }));
    }

    async extract(pdfPath) {
        const pdf = await this.loadDocument(pdfPath);

        const pages = [];

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);

            const items = await this.extractPageText(page);

            pages.push({
                page: i,
                items,
            });
        }

        return pages;
    };
};