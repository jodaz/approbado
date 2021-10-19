import { Router } from "express"
import { checkSchema } from 'express-validator'
import { validateSendSMSCode, validateLoginSchema, validateRegisterSchema } from '../validations'
import { sendSMSCode, logout, login, verifySMSCode } from '../controllers/AuthController'
import { isAuthorizedMiddleware } from '../config'

const authRouter = Router()

authRouter.post('/send', checkSchema(validateSendSMSCode), sendSMSCode)
authRouter.post('/register', checkSchema(validateRegisterSchema), verifySMSCode)
authRouter.post('/login', checkSchema(validateLoginSchema), login)
authRouter.get('/logout', isAuthorizedMiddleware, logout)
authRouter.get('/facebook', isAuthorizedMiddleware, (req, res) => {
    res.status(201).json({
        success: true
    })
})
authRouter.get('/facebook/callback', isAuthorizedMiddleware, (req, res) => {
    res.status(201).json({
        success: true
    })
});

export default authRouter;
