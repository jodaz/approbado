import { Router } from "express"
import { destroy, index, store,update, show } from '../controllers/QuestionController'

const questionsRouter = Router()

questionsRouter.get('/', index)
questionsRouter.get('/:id', show)
questionsRouter.post('/', store)
questionsRouter.put('/:id', update)
questionsRouter.delete('/:id', destroy)

export default questionsRouter;
