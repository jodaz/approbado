import { Router } from "express"
import { checkSchema } from 'express-validator'
import { validateSendSMSCode, validateLoginSchema, validateRegisterSchema,validateExternalMobileLogin, validateExternalLogin } from '../validations'
import { sendSMSCode, logout, login, verifySMSCode, externalLogin,externalMobileLogin, deleteAccount } from '../controllers/AuthController'
import { isAuthorizedMiddleware } from '../config'

const authRouter = Router()

authRouter.post('/send', checkSchema(validateSendSMSCode), sendSMSCode)
authRouter.post('/register', checkSchema(validateRegisterSchema), verifySMSCode)
authRouter.post('/external', checkSchema(validateExternalLogin), externalLogin)
authRouter.post('/mobile/external', checkSchema(validateExternalMobileLogin), externalMobileLogin)
authRouter.post('/login', checkSchema(validateLoginSchema), login)
authRouter.get('/logout', isAuthorizedMiddleware, logout)
authRouter.get('/delete-account', isAuthorizedMiddleware, deleteAccount)

export default authRouter;
