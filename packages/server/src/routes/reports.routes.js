import { Router } from "express"
import { destroy, index, store, update, show } from '../controllers/ReportController'
import { checkSchema } from 'express-validator'
import { createReportSchema } from '../validations'

const reportReasonRoutes = Router()

reportReasonRoutes.get('/', index)
reportReasonRoutes.get('/:id', show)
reportReasonRoutes.post('/', checkSchema(createReportSchema), store)
reportReasonRoutes.put('/:id', checkSchema(createReportSchema), update)
reportReasonRoutes.delete('/:id', destroy)

export default reportReasonRoutes;
