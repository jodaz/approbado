import { Router } from "express"
import { show, update } from '../controllers/TriviaSettingsController'
import { editTriviaSettingsSchema } from '../validations'
import { checkSchema } from 'express-validator';

const settingsRouter = Router()

settingsRouter.get('/:id', show)
settingsRouter.put('/:id', checkSchema(editTriviaSettingsSchema), update)

export default settingsRouter;
