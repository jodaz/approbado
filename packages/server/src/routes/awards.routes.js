import { Router } from "express"
import {
    destroy,
    index,
    indexAwardSubtheme,
    showResultTriviaGrupal,
    showResultTriviaGrupalSchedule,
    verifyAward,
    store,
    update,
    show
} from '../controllers/AwardController'
import { createAwardSchema } from '../validations'
import { checkSchema } from 'express-validator';
import { upload } from '../config'

const awardsRoutes = Router()

awardsRoutes.get('/', index)
awardsRoutes.get('/:token/:subtheme_id/:level_id', showResultTriviaGrupal)
awardsRoutes.get('/schedule/:schedule_id/:subtheme_id/:level_id', showResultTriviaGrupalSchedule)
awardsRoutes.get('/subthemes/:trivia_id', indexAwardSubtheme)
awardsRoutes.get('/:id', show)
awardsRoutes.post('/', upload.single('file'), checkSchema(createAwardSchema), store)
awardsRoutes.post('/verify', verifyAward)
awardsRoutes.put('/:id', upload.single('file'), checkSchema(createAwardSchema), update)
awardsRoutes.delete('/:id', destroy)

export default awardsRoutes;
