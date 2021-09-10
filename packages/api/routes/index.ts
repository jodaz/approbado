import { Router } from 'express';
import usersRouter from './user.routes';
import authRouter from './auth.routes'
import categoriesRoutes from './categories.routes';
import levelsRoutes from './levels.routes';
import triviaSettingsRoutes from './trivia-settings.routes';
import { isAuthorizedMiddleware } from '../config'

const routes = Router();

routes.use('/api/levels', levelsRoutes)
routes.use('/api/trivia-settings', triviaSettingsRoutes)
routes.use('/api/categories', categoriesRoutes)
routes.use('/api/users', isAuthorizedMiddleware, usersRouter)
routes.use('/api/auth', authRouter)

export default routes;
