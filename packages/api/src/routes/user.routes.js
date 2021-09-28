import { Router } from "express"
import { checkSchema } from 'express-validator'
import { destroy, show, index, store, update } from '../controllers/UserController'
import { validateUserSchema } from '../validations'

const usersRouter = Router()

usersRouter.get('/', index)
usersRouter.get('/:id', show)
usersRouter.post('/', checkSchema(validateUserSchema),store)
usersRouter.put('/:id', update)
usersRouter.delete('/:id', destroy)

export default usersRouter;
