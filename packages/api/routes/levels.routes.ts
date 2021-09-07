import { Router } from "express"
import { destroy, index, store, update } from '../controllers/LevelController'

const levelsRouter = Router()

levelsRouter.get('/', index)
levelsRouter.post('/', store)
levelsRouter.put('/:id', update)
levelsRouter.delete('/:id', destroy)

export default levelsRouter;
