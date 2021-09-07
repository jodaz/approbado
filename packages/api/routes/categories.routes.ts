import { Router } from "express"
import { destroy, index, store, update } from '../controllers/CategoryController'

const categoriesRouter = Router()

categoriesRouter.get('/', index)
categoriesRouter.post('/', store)
categoriesRouter.put('/:id', update)
categoriesRouter.delete('/:id', destroy)

export default categoriesRouter;
