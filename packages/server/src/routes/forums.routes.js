import { Router } from "express"
import { destroy, index,indexMobile, store, byUserId,update, show } from '../controllers/ForumController'
import { createForumSchema,createForumCommentSchema } from '../validations'
import { checkSchema } from 'express-validator';

const forumsRouter = Router()

forumsRouter.get('/', index)
forumsRouter.get('/:id', show)
forumsRouter.get('/user/:user_id', byUserId)
forumsRouter.post('/', checkSchema(createForumSchema), store)
forumsRouter.put('/:id', checkSchema(createForumSchema), update)
forumsRouter.delete('/:id', destroy)

export default forumsRouter;
