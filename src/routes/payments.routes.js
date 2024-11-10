import { Router } from "express"
import {
	index,
	download,
    createSuscription,
    cancelSuscription
} from '../controllers/PaymentController'

const paymentsRouter = Router()

paymentsRouter.get('/', index)
paymentsRouter.get('/download', download)
paymentsRouter.post('/create-suscription', createSuscription)
paymentsRouter.post('/cancel-suscription', cancelSuscription)

export default paymentsRouter;
