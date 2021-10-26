import { Router } from "express"
import { show, update } from '../controllers/ProfileController'

const profileRouter = Router()

profileRouter.get('/', show)
profileRouter.post('/', update)

export default profileRouter;
