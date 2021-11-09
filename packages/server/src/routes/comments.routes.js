import { Router } from "express"
import { destroy, index, store, update, show } from '../controllers/CommentController'
import { createCommentSchema } from '../validations'
import { checkSchema } from 'express-validator';

const commentsRouter = Router()

commentsRouter.get('/', index)
commentsRouter.get('/:id', show)
commentsRouter.post('/', checkSchema(createCommentSchema), store)
commentsRouter.put('/:id', checkSchema(createCommentSchema), update)
commentsRouter.delete('/:id', destroy)

export default commentsRouter;
