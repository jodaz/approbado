import { Router } from "express"
import { update } from '../controllers/UpdatePasswordController'

const updatePasswordRouter = Router()

updatePasswordRouter.post('/', update)

export default updatePasswordRouter;
