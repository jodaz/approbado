import { Router } from "express"
import {
    destroy,
    index,
    showByUser,
    showByChat,
    newNotifications,
    updateReadAt
} from '../controllers/NotificationController'

const notificationsRouter = Router()

notificationsRouter.get('/', index)
notificationsRouter.get('/new', newNotifications)
notificationsRouter.get('/user/:user_id', showByUser)
notificationsRouter.get('/chat/:chat_id', showByChat)
notificationsRouter.get('/:id', show)
notificationsRouter.put('/read_at/:id', updateReadAt)
notificationsRouter.delete('/:id', destroy)

export default notificationsRouter;
