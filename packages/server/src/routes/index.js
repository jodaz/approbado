import { Router } from 'express';
import usersRoutes from './user.routes';
import authRouter from './auth.routes'
import categoriesRoutes from './categories.routes';
import levelsRoutes from './levels.routes';
import profileRoutes from './profile.routes';
import updatePasswordRouter from './update-password.routes';
import updatePasswordMobileRouter from './update-password-mobile.routes';
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
import likePostRoutes from './like-posts.routes';
import reportReasonRoutes from './report-reason.routes';
import chatsRoutes from './chats.routes';
import questionsRoutes from './questions.routes';
import notificationsRoutes from './notifications.routes';
import fcmsRoutes from './fcms.routes';
import answersRoutes from './answers.routes';
import reportsRoutes from './reports.routes';
import blacklistedUsers from './blacklisted-users.routes';

const apiRouter = Router();

apiRouter.use('/questions', isAuthorizedMiddleware, questionsRoutes)
apiRouter.use('/answers', isAuthorizedMiddleware, answersRoutes)
apiRouter.use('/chats', isAuthorizedMiddleware, chatsRoutes)
apiRouter.use('/schedules', isAuthorizedMiddleware, schedulesRoutes)
apiRouter.use('/files', isAuthorizedMiddleware, filesRoutes)
apiRouter.use('/comments', isAuthorizedMiddleware, commentsRoutes)
apiRouter.use('/forums', isAuthorizedMiddleware, forumsRoutes)
apiRouter.use('/like-posts', isAuthorizedMiddleware, likePostRoutes)
apiRouter.use('/subthemes', isAuthorizedMiddleware, subthemesRoutes)
apiRouter.use('/report-reasons', isAuthorizedMiddleware, reportReasonRoutes)
apiRouter.use('/notifications', isAuthorizedMiddleware, notificationsRoutes)
apiRouter.use('/memberships/payments', isAuthorizedMiddleware, paymentsRoutes)
apiRouter.use('/memberships/plans', isAuthorizedMiddleware, plansRoutes)
apiRouter.use('/memberships', isAuthorizedMiddleware, memberships)
apiRouter.use('/configurations/levels', isAuthorizedMiddleware, levelsRoutes)
apiRouter.use('/configurations/categories', isAuthorizedMiddleware, categoriesRoutes)
apiRouter.use('/update-password', isAuthorizedMiddleware, updatePasswordRouter)
apiRouter.use('/profile', isAuthorizedMiddleware, profileRoutes)
apiRouter.use('/users', isAuthorizedMiddleware, usersRoutes)
apiRouter.use('/trivias', isAuthorizedMiddleware, triviasRoutes)
apiRouter.use('/awards', isAuthorizedMiddleware, awardsRoutes)
apiRouter.use('/fcms', isAuthorizedMiddleware, fcmsRoutes)
apiRouter.use('/auth', authRouter)
apiRouter.use('/reset-password', resetPasswordRouter)
apiRouter.use('/update-password-mobile', updatePasswordMobileRouter)
apiRouter.use('/reports', isAuthorizedMiddleware, reportsRoutes)
apiRouter.use('/blacklisted-users', isAuthorizedMiddleware, blacklistedUsers)

// Catch all other routes
apiRouter.use('/*', (req, res) => {
    res.status(404).json({
        'error': 'route not found'
    })
})

export default apiRouter;
