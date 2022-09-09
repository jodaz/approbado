import { Router } from "express"
import { destroy, index, store, update, show } from '../controllers/LevelController'
import { createLevelSchema } from '../validations'
import { checkSchema } from 'express-validator';

const levelsRouter = Router()

levelsRouter.get('/', index)
levelsRouter.get('/:id', show)
levelsRouter.post('/', checkSchema(createLevelSchema), store)
levelsRouter.put('/:id', checkSchema(createLevelSchema), update)
levelsRouter.delete('/:id', destroy)

export default levelsRouter;
