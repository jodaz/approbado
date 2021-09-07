import { Router } from "express"
import { sendSMSCode, logout, login, verifySMSCode } from '../controllers/AuthController'
import { isAuthorizedMiddleware } from '../config'

const authRouter = Router()

authRouter.post('/register', sendSMSCode)
authRouter.post('/verify', verifySMSCode)
authRouter.post('/login', login)
authRouter.get('/logout', isAuthorizedMiddleware, logout)

export default authRouter;
