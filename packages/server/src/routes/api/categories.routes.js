import { Router } from "express"
import { destroy, index, store, update, show } from '../../controllers/CategoryController'
import { createCategorySchema } from '../../validations'
import { checkSchema } from 'express-validator';

const categoriesRouter = Router()

categoriesRouter.get('/', index)
categoriesRouter.get('/:id', show)
categoriesRouter.post('/', checkSchema(createCategorySchema), store)
categoriesRouter.put('/:id', checkSchema(createCategorySchema), update)
categoriesRouter.delete('/:id', destroy)

export default categoriesRouter;
