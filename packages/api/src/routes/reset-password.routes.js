import { Router } from "express"
import { resetPassword, updatePassword } from '../controllers/ResetPasswordController'

const resetPasswordRouter = Router()

resetPasswordRouter.post('/', resetPassword)
resetPasswordRouter.update('/:token', updatePassword)

export default resetPasswordRouter;
