import { Router } from "express"
import { destroy, index, store, update, show } from '../controllers/ForumController'
import { createForumSchema } from '../validations'
import { checkSchema } from 'express-validator';

const forumsRouter = Router()

forumsRouter.get('/', index)
forumsRouter.get('/:id', show)
forumsRouter.post('/', checkSchema(createForumSchema), store)
forumsRouter.put('/:id', checkSchema(createForumSchema), update)
forumsRouter.delete('/:id', destroy)

export default forumsRouter;
