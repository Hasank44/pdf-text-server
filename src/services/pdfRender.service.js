import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas } from "canvas";

export class PdfRenderService {
  async renderPageToImage(pdfPath, pageNumber) {
    try {
      const pdfBuffer = fs.readFileSync(pdfPath);
      const pdf = await pdfjsLib.getDocument({
        data: new Uint8Array(pdfBuffer),
        disableFontFace: true,
        isEvalSupported: false,
      }).promise;

      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = createCanvas(viewport.width, viewport.height);
      const context = canvas.getContext("2d");

      await page.render({
        canvasContext: context,
        viewport,
        intent: "display",
      }).promise;

      return canvas.toBuffer("image/png");
    } catch (err) {
      console.error("RENDER ERROR:", err.message);

      // fallback → prevent crash
      return null;
    }
  }
}
