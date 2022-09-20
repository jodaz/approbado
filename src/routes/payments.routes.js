import { Router } from "express"
import {
	index,
	download
} from '../controllers/PaymentController'

const paymentsRouter = Router()

paymentsRouter.get('/', index)
paymentsRouter.get('/download', download)

export default paymentsRouter;
