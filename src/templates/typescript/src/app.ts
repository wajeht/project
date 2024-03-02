import express from 'express';
import compression from 'compression';
import hlemet from 'helmet';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(hlemet());
app.use(compression());

export { app };
