import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { corsOptions } from './config/cors';
import { errorMiddleware } from './common/middleware/error.middleware';
import router from './routes/index';

const app: Application = express();

// Middlewares globales
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.use('/api', router);

// Manejo de errores
app.use(errorMiddleware);

export default app;