import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import routes from "./routes/index.routes.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { APP_CONSTANTS } from "./constants/app.constants.js";

const app = express();

// Security middlewares
app.use(helmet());
app.use(
  cors({
    origin: [process.env.FRONT_URL],
    credentials: true,
  }),
);

// Logging
app.use(morgan("dev"));

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

// Routes
app.use("/api", routes);

// Not found
app.use(notFoundMiddleware);

// Error handler
app.use(errorMiddleware);

export default app;