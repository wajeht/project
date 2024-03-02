import express from 'express';

const user = express.Router();

user.get('/', (req, res) => res.json({ message: 'ok' }));

export { user };
