import { Router } from "express"
import { destroy, index, store,showResult,update, show } from '../controllers/QuestionController'

const questionsRouter = Router()

questionsRouter.get('/', index)
questionsRouter.get('/:id', show)
questionsRouter.get('/:subtheme_id/:level_id/:user_id', showResult)
questionsRouter.post('/', store)
questionsRouter.put('/:id', update)
questionsRouter.delete('/:id', destroy)

export default questionsRouter;
