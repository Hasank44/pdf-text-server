export class PdfDetectionService {
    constructor() {
        this.TEXT_THRESHOLD = 5;
        this.CHAR_THRESHOLD = 20;
    };
    analyzePage(pageItems = []) {
        const textCount = pageItems.length;
        const fullText = pageItems.map((i) => i.text).join(" ").trim();
        const charCount = fullText.length;

        return {
            textCount,
            charCount,
            isTextHeavy:
                textCount >= this.TEXT_THRESHOLD &&
                charCount >= this.CHAR_THRESHOLD
        };
    };

    detectPDF(pages) {
        let textPages = 0;
        let scannedPages = 0;
        const analyzed = pages.map((page) => {
            const analysis = this.analyzePage(page.items);
            if (analysis.isTextHeavy) {
                textPages++;
                return {
                    page: page.page,
                    type: "text"
                };
            };
            scannedPages++;
            return {
                page: page.page,
                type: "scanned"
            };
        });

        const total = pages.length;
        let pdfType = "mixed";

        if (textPages === total) pdfType = "text-layer";
        if (scannedPages === total) pdfType = "scanned";
        return {
            pdfType,
            pageMap: analyzed,
            stats: {
                totalPages: total,
                textPages,
                scannedPages
            }
        };
    };
};