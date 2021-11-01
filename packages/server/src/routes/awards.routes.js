import { Router } from "express"
import { destroy, index, store, update, show } from '../controllers/AwardController'
import { createCategorySchema } from '../validations'
import { checkSchema } from 'express-validator';

const awardsRoutes = Router()

awardsRoutes.get('/', index)
awardsRoutes.get('/:id', show)
awardsRoutes.post('/', store)
awardsRoutes.put('/:id', update)
awardsRoutes.delete('/:id', destroy)

export default awardsRoutes;
