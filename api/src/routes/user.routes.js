import { Router } from "express"
import { body } from 'express-validator'
import { destroy, show, index, store, update } from '../controllers/UserController'
import { emailExists } from '../validations/users'

const usersRouter = Router()

usersRouter.get('/', index)
usersRouter.get('/:id', show)
usersRouter.post(
    '/', 
    body('email').custom(emailExists), 
    store
)
usersRouter.put('/:id', update)
usersRouter.delete('/:id', destroy)

export default usersRouter;
