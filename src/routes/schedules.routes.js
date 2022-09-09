import { Router } from "express"
import { destroy, index,byUserId, show, store,updateFinishedShedule,show_participants,show_participants_pending,new_schedules, update } from '../controllers/ScheduleController'
import { createScheduleSchema } from '../validations'
import { checkSchema } from 'express-validator';

const schedulesRouter = Router()

schedulesRouter.get('/', index)
schedulesRouter.get('/user/:user_id', byUserId)
schedulesRouter.get('/new', new_schedules)
schedulesRouter.get('/participants/:id', show_participants)
schedulesRouter.get('/participants/pending/:id', show_participants_pending)
schedulesRouter.get('/:id', show)
schedulesRouter.post('/', checkSchema(createScheduleSchema), store)
schedulesRouter.put('/:id', checkSchema(createScheduleSchema), update)
schedulesRouter.put('/finished/:user_id/:id', updateFinishedShedule)
schedulesRouter.delete('/:id', destroy)

export default schedulesRouter;
