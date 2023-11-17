import { Router } from "express"
import { checkSchema } from 'express-validator'
import {
    validateSendSMSCode,
    validateLoginSchema,
    validateRegisterSchema,
    validateExternalMobileLogin,
    validateExternalLogin,
    validateAdminLoginSchema,
    validateCreateAccountMobileStep1
} from '../validations'
import {
    sendSMSCode,
    logout,
    login,
    verifySMSCode,
    externalLogin,
    externalMobileLogin,
    deleteAccount,
    adminLogin,
    getUser,
    validateMobileRequestStep1
} from '../controllers/AuthController'
import { isAuthorizedMiddleware } from '../config'

const authRouter = Router()

authRouter.post('/send', checkSchema(validateSendSMSCode), sendSMSCode)
authRouter.post(
    '/mobile/create-account-verification',
    checkSchema(validateCreateAccountMobileStep1),
    validateMobileRequestStep1
)
authRouter.post('/register', checkSchema(validateRegisterSchema), verifySMSCode)
authRouter.post('/external', checkSchema(validateExternalLogin), externalLogin)
authRouter.post('/mobile/external', checkSchema(validateExternalMobileLogin), externalMobileLogin)
authRouter.post('/login', checkSchema(validateLoginSchema), login)
authRouter.post('/admin-login', checkSchema(validateAdminLoginSchema), adminLogin)
authRouter.get('/logout', isAuthorizedMiddleware, logout)
authRouter.get('/user', isAuthorizedMiddleware, getUser)
authRouter.get('/delete-account', isAuthorizedMiddleware, deleteAccount)

export default authRouter;
