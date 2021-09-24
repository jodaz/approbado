import { Router } from "express"
import { index } from '../controllers/PaymentController'

const paymentsRouter = Router()

paymentsRouter.get('/', index)

export default paymentsRouter;
