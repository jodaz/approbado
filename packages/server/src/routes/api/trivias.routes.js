import { Router } from "express"
import { destroy, index, show, store, update } from '../../controllers/TriviaController'
import { createTriviaSchema } from '../../validations'
import { checkSchema } from 'express-validator';

const triviasRouter = Router()

triviasRouter.get('/', index)
triviasRouter.get('/:id', show)
triviasRouter.post('/', checkSchema(createTriviaSchema), store)
triviasRouter.put('/:id', update)
triviasRouter.delete('/:id', destroy)

export default triviasRouter;
