import { Router } from "express"
import { sendSMSCode, verifySMSCode } from '../controllers/AuthController'

const authRouter = Router()

authRouter.post('/send', sendSMSCode)
authRouter.post('/verify', verifySMSCode)

export default authRouter;
