import { Router } from 'express';
import usersRoutes from './user.routes';
import authRouter from './auth.routes'
import categoriesRoutes from './categories.routes';
import levelsRoutes from './levels.routes';
import triviaSettingsRoutes from './trivia-settings.routes';
import profileRoutes from './profile.routes';
import triviasRoutes from './trivias.routes';
import { isAuthorizedMiddleware } from '../config'

const routes = Router();

routes.use('/api/levels', levelsRoutes)
routes.use('/api/trivia-settings', triviaSettingsRoutes)
routes.use('/api/categories', categoriesRoutes)
routes.use('/api/profile', isAuthorizedMiddleware, profileRoutes)
routes.use('/api/users', usersRoutes)
routes.use('/api/trivias', triviasRoutes)
routes.use('/api/auth', authRouter)

// Catch all routes
routes.use('*', (req, res) => {
    res.status(404).json({
        'error': 'route not found' 
    }) 
})

export default routes;
