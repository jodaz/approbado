import { Router } from "express"
import { index } from '../controllers/UserController'

const usersRouter = Router()

usersRouter.get('/', index);

export default usersRouter;
