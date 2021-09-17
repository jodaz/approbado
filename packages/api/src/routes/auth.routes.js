import { Router } from "express"
import { body } from 'express-validator'
import { phoneExists, emailExists } from '../validations/users'
import { sendSMSCode, logout, login, verifySMSCode } from '../controllers/AuthController'
import { isAuthorizedMiddleware } from '../config'

const authRouter = Router()

authRouter.post(
  '/send',
  body('phoneNumber').custom(phoneExists),
  sendSMSCode
)
authRouter.post(
    '/register', 
    body('email').custom(emailExists), 
    verifySMSCode
)
authRouter.post('/login', login)
authRouter.get('/logout', isAuthorizedMiddleware, logout)

export default authRouter;
