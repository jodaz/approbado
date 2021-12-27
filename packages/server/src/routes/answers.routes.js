import { Router } from "express"
import { destroy, destroyByUserId,index, store, update, show } from '../controllers/AnswerController'
import { createAnswerSchema } from '../validations'
import { checkSchema } from 'express-validator';

const answersRouter = Router()

answersRouter.get('/', index)
answersRouter.get('/:id', show)
answersRouter.post('/', checkSchema(createAnswerSchema), store)
answersRouter.put('/:id', checkSchema(createAnswerSchema), update)
answersRouter.delete('/user/:user_id/:subtheme_id/:level_id', destroyByUserId)
answersRouter.delete('/:id', destroy)


export default answersRouter;
