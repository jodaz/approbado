import { Router } from "express"
import { sendSMSCode, verifySMSCode } from '../controllers/AuthController'

const authRouter = Router()

authRouter.post('/register', sendSMSCode)
authRouter.post('/verify', verifySMSCode)

export default authRouter;
