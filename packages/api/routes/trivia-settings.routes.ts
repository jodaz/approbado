import { Router } from "express"
import { show, update } from '../controllers/TriviaSettingsController'

const settingsRouter = Router()

settingsRouter.get('/:id', show)
settingsRouter.put('/:id', update)

export default settingsRouter;
