import { Router } from "express"
import { destroy, index } from '../controllers/UserController'

const usersRouter = Router()

usersRouter.get('/', index)
usersRouter.delete('/:id', destroy)

export default usersRouter;
