import path from 'path';
import ejs from 'ejs';
import expressLayouts from 'express-ejs-layouts';
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(path.join(process.cwd(), 'src', 'public')), { maxAge: '24h' }));

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.resolve(path.join(process.cwd(), 'src', 'views', 'pages')));
app.set('layout', path.resolve(path.join(process.cwd(), 'src', 'views', 'layouts', 'main.html')));
app.use(expressLayouts);

app.use('/api', apiRouter);
app.get('/healthz', healthCheckHandler);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
