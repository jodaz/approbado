import { Router } from "express"
import { destroy, index, newMessages, show, store, update, storeMessage, updateStatus,updateReadAt} from '../controllers/ChatController'
import { createChatSchema, createMessageSchema, updateChatSchema} from '../validations'
import { checkSchema } from 'express-validator';
import { upload } from '../config'

const chatsRouter = Router()

chatsRouter.get('/', index)
chatsRouter.get('/:id', show)
chatsRouter.get('/message/new', newMessages)
chatsRouter.post('/', checkSchema(createChatSchema), store)
chatsRouter.post('/:id/messages', upload.single('file'), checkSchema(createMessageSchema), storeMessage)
chatsRouter.put('/:id', checkSchema(createChatSchema), update)
chatsRouter.put('/status/:chat_id/:user_id', checkSchema(updateChatSchema), updateStatus)
chatsRouter.put('/:chat_id/read_at', updateReadAt)
chatsRouter.delete('/:id', destroy)

export default chatsRouter;
