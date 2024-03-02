import { user } from './user/user.router';

import express, { Router } from 'express';

const api: Router = express.Router();

api.use('/users', user);

export { api };
