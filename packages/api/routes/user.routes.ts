import { Router } from "express"
import { body } from 'express-validator'
import { destroy, index, store } from '../controllers/UserController'
import { emailExists } from '../validations/users'

const usersRouter = Router()

usersRouter.get('/', index)
usersRouter.post(
    '/', 
    body('email').custom(emailExists), 
    store
)
usersRouter.delete('/:id', destroy)

export default usersRouter;
