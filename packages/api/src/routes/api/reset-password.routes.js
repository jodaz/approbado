import { Router } from "express"
import { resetPassword, updatePassword, verifyToken } from '../../controllers/ResetPasswordController'
import { validateResetPassword, validateNewPassword, validateVerifyToken } from '../../validations'
import { checkSchema } from 'express-validator'

const resetPasswordRouter = Router()

resetPasswordRouter.post('/', checkSchema(validateResetPassword), resetPassword)
resetPasswordRouter.post('/verify/:token', checkSchema(validateVerifyToken), verifyToken)
resetPasswordRouter.put('/{token?}', checkSchema(validateNewPassword), updatePassword)

export default resetPasswordRouter;
