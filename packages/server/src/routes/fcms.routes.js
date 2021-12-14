import { Router } from "express"
import { upload } from '../config'
import { destroy,store } from '../controllers/FcmController'
import { createFcmSchema } from '../validations'
import { checkSchema } from 'express-validator';

const triviasRouter = Router()

triviasRouter.post('/', checkSchema(createFcmSchema), store)
triviasRouter.delete('/:user_id/:token', destroy)

export default triviasRouter;
