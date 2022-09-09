import { Router } from "express"
import { resetPassword, updatePassword, resetPasswordMobile,verifyToken } from '../controllers/ResetPasswordController'
import { validateResetPassword, validateNewPassword, validateVerifyToken } from '../validations'
import { checkSchema } from 'express-validator'

const resetPasswordRouter = Router()

resetPasswordRouter.post('/', checkSchema(validateResetPassword), resetPassword)
resetPasswordRouter.post('/mobile', checkSchema(validateResetPassword), resetPasswordMobile)
resetPasswordRouter.get('/', checkSchema(validateVerifyToken), verifyToken)
resetPasswordRouter.put('/', checkSchema(validateNewPassword), updatePassword)


export default resetPasswordRouter;
