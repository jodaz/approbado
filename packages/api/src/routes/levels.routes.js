import { Router } from "express"
import { destroy, index, store, update } from '../controllers/LevelController'
import { createLevelSchema } from '../validations'
import { checkSchema } from 'express-validator';

const levelsRouter = Router()

levelsRouter.get('/', index)
levelsRouter.post('/', checkSchema(createLevelSchema), store)
levelsRouter.put('/:id', checkSchema(createLevelSchema), update)
levelsRouter.delete('/:id', destroy)

export default levelsRouter;
