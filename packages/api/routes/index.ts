import { Router } from 'express';
import usersRouter from './user.routes';
import authRouter from './auth.routes'

const routes = Router();

routes.use('/api/users', usersRouter);
routes.use('/api/auth', authRouter)

export default routes;
