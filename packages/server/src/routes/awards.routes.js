import { Router } from "express"
import { destroy, index,indexAwardSubtheme, verifyAward, store, update, show } from '../controllers/AwardController'
import { createCategorySchema } from '../validations'
import { checkSchema } from 'express-validator';

const awardsRoutes = Router()

awardsRoutes.get('/', index)
awardsRoutes.get('/subthemes/:trivia_id', indexAwardSubtheme)
awardsRoutes.get('/:id', show)
awardsRoutes.post('/', store)
awardsRoutes.post('/verify', verifyAward)
awardsRoutes.put('/:id', update)
awardsRoutes.delete('/:id', destroy)

export default awardsRoutes;
