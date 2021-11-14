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
import subthemesRoutes from './subthemes.routes';
import memberships from './memberships.routes';
import resetPasswordRouter from './reset-password.routes';
import { isAuthorizedMiddleware } from '../config'
import awardsRoutes from './awards.routes';
import forumsRoutes from './forums.routes';
import commentsRoutes from './comments.routes';
import filesRoutes from './files.routes';
import schedulesRoutes from './schedules.routes';

const apiRouter = Router();

apiRouter.use('/schedules', isAuthorizedMiddleware, schedulesRoutes)
apiRouter.use('/files', isAuthorizedMiddleware, filesRoutes)
apiRouter.use('/comments', isAuthorizedMiddleware, commentsRoutes)
apiRouter.use('/forums', isAuthorizedMiddleware, forumsRoutes)
apiRouter.use('/subthemes', isAuthorizedMiddleware, subthemesRoutes)
apiRouter.use('/memberships', isAuthorizedMiddleware, memberships)
apiRouter.use('/memberships/payments', isAuthorizedMiddleware, paymentsRoutes)
apiRouter.use('/memberships/plans', isAuthorizedMiddleware, plansRoutes)
apiRouter.use('/configurations/levels', isAuthorizedMiddleware, levelsRoutes)
apiRouter.use('/configurations/categories', isAuthorizedMiddleware, categoriesRoutes)
apiRouter.use('/update-password', isAuthorizedMiddleware, updatePasswordRouter)
apiRouter.use('/profile', isAuthorizedMiddleware, profileRoutes)
apiRouter.use('/users', isAuthorizedMiddleware, usersRoutes)
apiRouter.use('/trivias', isAuthorizedMiddleware, triviasRoutes)
apiRouter.use('/awards', isAuthorizedMiddleware, awardsRoutes)
apiRouter.use('/auth', authRouter)
apiRouter.use('/reset-password', resetPasswordRouter)

// Catch all other routes
apiRouter.use('/*', (req, res) => {
    res.status(404).json({
        'error': 'route not found'
    })
})

export default apiRouter;
