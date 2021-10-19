import { Router } from "express"
import { destroy, index, show, store, update } from '../controllers/PlanController'
import { createPlanSchema } from '../validations'
import { checkSchema } from 'express-validator';

const plans = Router()

plans.get('/', index)
plans.get('/:id', show)
plans.post('/', checkSchema(createPlanSchema), store)
plans.put('/:id', checkSchema(createPlanSchema), update)
plans.delete('/:id', destroy)

export default plans;
