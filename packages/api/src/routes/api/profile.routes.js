import { Router } from "express"
import { show, update } from '../../controllers/ProfileController'

const profileRouter = Router()

profileRouter.get('/', show)
profileRouter.put('/', update)

export default profileRouter;
