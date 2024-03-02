import express from 'express';
import compression from 'compression';
import hlemet from 'helmet';
import cors from 'cors';
import { api as apiRouter } from './api/api.router';
import { errorHandler, healthCheckHandler, notFoundHandler } from './app.middleware';

const app = express();

app.use(cors());
app.use(hlemet());
app.use(compression());

app.use('/api', apiRouter);
app.get('/healthz', healthCheckHandler);
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
