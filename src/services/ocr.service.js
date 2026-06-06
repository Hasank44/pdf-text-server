import Tesseract from "tesseract.js";

export class OcrService {
    async recognize(imageBuffer, language = "eng+ben") {
        const result = await Tesseract.recognize(imageBuffer, language, {
            logger: () => { },
        });
        const words = result.data.words || [];
        const structured = words.map(w => ({
            text: w.text,
            x: w.bbox.x0,
            y: w.bbox.y0,
            width: w.bbox.x1 - w.bbox.x0,
            height: w.bbox.y1 - w.bbox.y0,
            confidence: w.confidence,
        }));
        return {
            text: result.data.text,
            confidence: result.data.confidence,
            items: structured,
        };
    };
};
