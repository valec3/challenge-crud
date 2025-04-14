import express from 'express';
import cors from 'cors';
import { swaggerDocs } from './docs/swagger.js';
import errorHandler from './middlewares/errorHandler.js';
import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', indexRoutes);

// Swagger Documentation
swaggerDocs(app);

// Error Handler
app.use(errorHandler);

export default app;