import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { corsOptions } from "./config/cors";
import { errorMiddleware } from "./common/middleware/error.middleware";
import router from "./routes/index";
import { globalRateLimit } from "./common/middleware/rateLimit.middleware";

const app: Application = express();

// Middlewares globales
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(globalRateLimit);

// Rutas
app.use("/api", router);

// Manejo de errores
app.use(errorMiddleware);

export default app;
