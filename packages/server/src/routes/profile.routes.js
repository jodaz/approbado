import { Router } from "express"
import { show, update } from '../controllers/ProfileController'
import { upload } from '../config'
import { validateUserSchema } from "../validations/users.schemas"
import { checkSchema } from 'express-validator';

const profileRouter = Router()

profileRouter.get('/', show)
profileRouter.post('/', upload.single('file'), checkSchema(validateUserSchema), update)

export default profileRouter;
