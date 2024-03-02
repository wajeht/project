import express from 'express';

const app = express();

app.get('/healthz');

export { app };
