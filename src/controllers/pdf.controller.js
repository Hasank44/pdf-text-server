import { ExtractionService } from "../services/extractionService.js";
import { ResponseFormatter } from "../services/responseFormatter.service.js";
import { PerformanceService } from "../services/performance.service.js";

const extractor = new ExtractionService();
const formatter = new ResponseFormatter();
const perf = new PerformanceService();

export const extractPdf = async (req, res) => {
    try {
        perf.start();
        const filePath = req.file.path;
        // console.log(req.file);
        const mode = req.body.mode || "plain";
        const result = await extractor.extract(filePath, mode);
        const processingTime = perf.end();

        const response = formatter.buildSuccess(result, {
            pdfType: result.pdfType || "unknown",
            mode,
            pageCount: result.pages?.length || 0,
            processingTime,
        });

        res.status(200).json(response);
    } catch (err) {
        // console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    };
};
