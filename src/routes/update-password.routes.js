import { Router } from "express"
import { update } from '../controllers/UpdatePasswordController'
import { updatePassword } from '../validations'
import { checkSchema } from 'express-validator'

const updatePasswordRouter = Router()

updatePasswordRouter.post('/', checkSchema(updatePassword), update)

export default updatePasswordRouter;
