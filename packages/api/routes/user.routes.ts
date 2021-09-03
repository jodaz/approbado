import { Router } from "express"
import { destroy, index, store } from '../controllers/UserController'

const usersRouter = Router()

usersRouter.get('/', index)
usersRouter.post('/', store)
usersRouter.delete('/:id', destroy)

export default usersRouter;
