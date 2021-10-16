import { Router } from 'express';
import usersRoutes from './user.routes';
import authRouter from './auth.routes'
import categoriesRoutes from './categories.routes';
import levelsRoutes from './levels.routes';
import profileRoutes from './profile.routes';
import updatePasswordRouter from './update-password.routes';
import triviasRoutes from './trivias.routes';
import plansRoutes from './plans.routes';
import paymentsRoutes from './payments.routes';
import memberships from './memberships.routes';
import resetPasswordRouter from './reset-password.routes';
import { isAuthorizedMiddleware } from '../../config'

const apiRouter = Router();

apiRouter.use('/api/memberships', isAuthorizedMiddleware, memberships)
apiRouter.use('/api/memberships/payments', isAuthorizedMiddleware, paymentsRoutes)
apiRouter.use('/api/memberships/plans', isAuthorizedMiddleware, plansRoutes)
apiRouter.use('/api/configurations/levels', isAuthorizedMiddleware, levelsRoutes)
apiRouter.use('/api/configurations/categories', isAuthorizedMiddleware, categoriesRoutes)
apiRouter.use('/api/update-password', isAuthorizedMiddleware, updatePasswordRouter)
apiRouter.use('/api/profile', isAuthorizedMiddleware, profileRoutes)
apiRouter.use('/api/users', isAuthorizedMiddleware, usersRoutes)
apiRouter.use('/api/trivias', isAuthorizedMiddleware, triviasRoutes)
apiRouter.use('/api/auth', authRouter)
apiRouter.use('/api/reset-password', resetPasswordRouter)

// Catch all other routes
apiRouter.use('/api/*', (req, res) => {
    res.status(404).json({
        'error': 'route not found'
    })
})

export default apiRouter;
