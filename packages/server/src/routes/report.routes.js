import { Router } from "express"
import { destroy, index, store, update, show } from '../controllers/ReportReasonController'
//import { createCategorySchema } from '../validations'
import { checkSchema } from 'express-validator';

const reportReasonRoutes = Router()

reportReasonRoutes.get('/', index)
reportReasonRoutes.get('/:id', show)
reportReasonRoutes.post('/', store)
reportReasonRoutes.put('/:id', update)
reportReasonRoutes.delete('/:id', destroy)

export default reportReasonRoutes;
