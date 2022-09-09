import { Router } from "express"
import { updateMobile } from '../controllers/UpdatePasswordController'
import { validateNewPassword } from '../validations'
import { checkSchema } from 'express-validator'

const updatePasswordRouter = Router()

updatePasswordRouter.post('/update', checkSchema(validateNewPassword), updateMobile)

export default updatePasswordRouter;
