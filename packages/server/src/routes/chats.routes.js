import { Router } from "express"
import { destroy, index, show, store, update, storeMessage } from '../controllers/ChatController'
import { createChatSchema, createMessageSchema } from '../validations'
import { checkSchema } from 'express-validator';
import { upload } from '../config'

const chatsRouter = Router()

chatsRouter.get('/', index)
chatsRouter.get('/:id', show)
chatsRouter.post('/', checkSchema(createChatSchema), store)
chatsRouter.put('/:id', checkSchema(createChatSchema), update)
chatsRouter.delete('/:id', destroy)
chatsRouter.post('/:id/messages', upload.single('file'), checkSchema(createMessageSchema), storeMessage)

export default chatsRouter;
