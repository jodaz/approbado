import { Router } from 'express';
import usersRoutes from './user.routes';
import authRouter from './auth.routes'
import categoriesRoutes from './categories.routes';
import levelsRoutes from './levels.routes';
import triviaSettingsRoutes from './trivia-settings.routes';
import profileRoutes from './profile.routes';
import updatePasswordRouter from './update-password.routes';
import triviasRoutes from './trivias.routes';
import { isAuthorizedMiddleware } from '../config'

const routes = Router();

routes.use('/api/configurations/levels', isAuthorizedMiddleware, levelsRoutes)
routes.use('/api/trivia-settings', isAuthorizedMiddleware, triviaSettingsRoutes)
routes.use('/api/configurations/categories', isAuthorizedMiddleware, categoriesRoutes)
routes.use('/api/update-password', isAuthorizedMiddleware, updatePasswordRouter)
routes.use('/api/profile', isAuthorizedMiddleware, profileRoutes)
routes.use('/api/users', isAuthorizedMiddleware, usersRoutes)
routes.use('/api/trivias', isAuthorizedMiddleware, triviasRoutes)
routes.use('/api/auth', authRouter)

// Catch all other routes
routes.use('*', (req, res) => {
    res.status(404).json({
        'error': 'route not found' 
    }) 
})

export default routes;
