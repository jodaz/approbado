import { Router } from "express"
import { index, store, update, show } from '../controllers/BlacklistedUserController'
import { createBlacklistedUserSchema } from '../validations'
import { checkSchema } from 'express-validator';

const levelsRouter = Router()

levelsRouter.get('/', index)
levelsRouter.get('/:id', show)
levelsRouter.post('/', checkSchema(createBlacklistedUserSchema), store)
levelsRouter.put('/:id', checkSchema(createBlacklistedUserSchema), update)

export default levelsRouter;
