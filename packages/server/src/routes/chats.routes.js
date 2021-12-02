import { Router } from "express"
import { destroy, index, show, store, update } from '../controllers/ChatController'
import { createChatSchema } from '../validations'
import { checkSchema } from 'express-validator';

const chatsRouter = Router()

chatsRouter.get('/', index)
chatsRouter.get('/:id', show)
chatsRouter.post('/', checkSchema(createChatSchema), store)
chatsRouter.put('/:id', checkSchema(createChatSchema), update)
chatsRouter.delete('/:id', destroy)

export default chatsRouter;
