import { Router } from "express"
import { destroy, index, store, showResult, update, show, upload } from '../controllers/QuestionController'
import { upload as uploadMiddleware } from '../config'

const questionsRouter = Router()

questionsRouter.get('/', index)
questionsRouter.get('/:id', show)
questionsRouter.get('/:subtheme_id/:level_id/:user_id', showResult)
questionsRouter.post('/', store)
questionsRouter.post('/upload', uploadMiddleware.single('file'), upload)
questionsRouter.put('/:id', update)
questionsRouter.delete('/:id', destroy)

export default questionsRouter;
