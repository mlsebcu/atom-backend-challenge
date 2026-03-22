import { CorsOptions } from "cors";
import * as dotenv from "dotenv";

dotenv.config();

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowed = (process.env["ALLOWED_ORIGINS"] ?? "http://localhost:4200")
      .split(",")
      .map((o) => o.trim());

    // Permite requests sin origin (Postman, curl, etc.) o si el origin está en la lista de permitidos
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} no permitido`));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
