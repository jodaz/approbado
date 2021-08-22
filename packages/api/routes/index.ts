import { Router } from 'express';
import usersRouter from './user.routes';

const routes = Router();

routes.use('/api/users', usersRouter);

export default routes;
