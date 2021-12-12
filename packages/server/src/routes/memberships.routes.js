import { Router } from "express"
import { index, byUserId } from '../controllers/MembershipController'

const membershipsRouter = Router()

membershipsRouter.get('/', index)
membershipsRouter.get('/:user_id', byUserId)

export default membershipsRouter;
