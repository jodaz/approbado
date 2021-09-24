import { Router } from "express"
import { index } from '../controllers/MembershipController'

const membershipsRouter = Router()

membershipsRouter.get('/', index)

export default membershipsRouter;
