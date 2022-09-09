import { Router } from "express"
import { show, index } from '../controllers/ReportReasonController'

const reportReasonRoutes = Router()

reportReasonRoutes.get('/', index)
reportReasonRoutes.get('/:id', show)

export default reportReasonRoutes;
