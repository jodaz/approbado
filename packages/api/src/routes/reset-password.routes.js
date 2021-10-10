import { Router } from "express"
import { resetPassword, updatePassword } from '../controllers/ResetPasswordController'
import { validateResetPassword } from '../validations'
import { checkSchema } from 'express-validator'

const resetPasswordRouter = Router()

resetPasswordRouter.post('/', checkSchema(validateResetPassword), resetPassword)
resetPasswordRouter.put('/:token', updatePassword)

export default resetPasswordRouter;
