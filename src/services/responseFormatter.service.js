export class ResponseFormatter {
    buildSuccess(data, meta = {}) {
        return {
            success: true,
            pdfType: meta.pdfType,
            mode: meta.mode,
            pageCount: meta.pageCount,
            wordCount: this.countWords(data),
            characterCount: this.countChars(data),
            processingTime: meta.processingTime,
            data,
        };
    };

    countWords(data) {
        if (!data) return 0;
        const text = data.text || data.blocks?.map(b => b.text).join(" ") || "";
        return text.split(/\s+/).filter(Boolean).length;
    };

    countChars(data) {
        if (!data) return 0;
        const text = data.text || data.blocks?.map(b => b.text).join(" ") || "";
        return text.length;
    };
};
