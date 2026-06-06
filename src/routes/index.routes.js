import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { extractPdf } from "../controllers/pdf.controller.js";
import { healthCheck } from "../controllers/health.controller.js";

const router = express.Router();

router.get("/health", healthCheck);

// FINAL API
router.post("/pdf/extract", upload.single("pdf"), extractPdf);

export default router;