import { Router } from "express"
import { destroy, index, show, store, update } from '../controllers/TriviaController'

const triviasRouter = Router()

triviasRouter.get('/', index)
triviasRouter.get('/:id', show)
triviasRouter.post('/', store)
triviasRouter.put('/:id', update)
triviasRouter.delete('/:id', destroy)

export default triviasRouter;
