import { Router } from "express"
import { destroy, index, store, update, show } from '../controllers/CategoryController'

const categoriesRouter = Router()

categoriesRouter.get('/', index)
categoriesRouter.get('/:id', show)
categoriesRouter.post('/', store)
categoriesRouter.put('/:id', update)
categoriesRouter.delete('/:id', destroy)

export default categoriesRouter;
