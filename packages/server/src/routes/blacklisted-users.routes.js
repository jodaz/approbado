import { Router } from "express"
import { index, store, update, show, destroy } from '../controllers/BlacklistedUserController'
import { createBlacklistedUserSchema } from '../validations'
import { checkSchema } from 'express-validator';

const blacklistedRoutes = Router()

blacklistedRoutes.get('/', index)
blacklistedRoutes.get('/:id', show)
blacklistedRoutes.post('/', checkSchema(createBlacklistedUserSchema), store)
blacklistedRoutes.put('/:id', checkSchema(createBlacklistedUserSchema), update)
blacklistedRoutes.delete('/:id', destroy)

export default blacklistedRoutes;
