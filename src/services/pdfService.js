import { PdfEngineService } from "./pdfEngine.service.js";
import { PdfDetectionService } from "./pdfDetection.service.js";
import { PdfRenderService } from "./pdfRender.service.js";
import { OcrService } from "./ocr.service.js";
import { BlockDetectionService } from "./blockDetection.service.js";
import { ReadingOrderService } from "./readingOrder.service.js";

export class PdfService {
  constructor() {
    this.engine = new PdfEngineService();
    this.detector = new PdfDetectionService();
    this.renderer = new PdfRenderService();
    this.ocr = new OcrService();
    this.blocker = new BlockDetectionService();
    this.order = new ReadingOrderService();
  };

  async extract(filePath) {
    const pages = await this.engine.extract(filePath);
    const detection = this.detector.detectPDF(pages);
    const pageMap = new Map(detection.pageMap.map(p => [p.page, p.type]));

    const finalPages = [];

    for (const page of pages) {
      const pageType = pageMap.get(page.page);

      let items = [];
      // TEXT LAYER PAGE
      if (pageType === "text") {
        items = page.items;
      }
      // SCANNED PAGE (OCR)
      else {
        const imageBuffer = await this.renderer.renderPageToImage(
          filePath,
          page.page,
        );

        // ⚠️ SAFE GUARD (IMPORTANT)
        if (!imageBuffer) {
          console.log(`OCR skipped page ${page.page}`);

          finalPages.push({
            page: page.page,
            source: "Hasan",
            blocks: [],
          });
          continue;
        };
        const ocrResult = await this.ocr.recognize(imageBuffer);
        items = ocrResult.items || [];
      }

      // NORMALIZE ITEMS (VERY IMPORTANT)
      const normalizedItems = items.map(i => ({
        text: i.text || "",
        x: i.x || 0,
        y: i.y || 0,
        width: i.width || 0,
        height: i.height || 0,
      }));

      // BLOCK DETECTION
      const blocks = this.blocker.detectBlocks(normalizedItems);

      const orderedBlocks = this.order.orderBlocks(blocks);

      finalPages.push({
        page: page.page,
        source: pageType === "text" ? "pdfjs" : "ocr",
        blocks: orderedBlocks,
      });
    }

    return {
      pdfType: detection.pdfType,
      stats: detection.stats,
      pages: finalPages,
    };
  }
}
