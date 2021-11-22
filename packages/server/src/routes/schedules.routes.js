import { Router } from "express"
import { destroy, index,all, show, store, update } from '../controllers/ScheduleController'
import { createScheduleSchema } from '../validations'
import { checkSchema } from 'express-validator';

const schedulesRouter = Router()

schedulesRouter.get('/', index)
schedulesRouter.get('/all', all)
schedulesRouter.get('/:id', show)
schedulesRouter.post('/', checkSchema(createScheduleSchema), store)
schedulesRouter.put('/:id', checkSchema(createScheduleSchema), update)
schedulesRouter.delete('/:id', destroy)

export default schedulesRouter;
