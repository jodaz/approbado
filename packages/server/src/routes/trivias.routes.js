import { Router } from "express"
import { upload } from '../config'
import {
    destroy,
    index,
    show,
    storeGrupal,
    showGrupal,
    indexByPlan,
    store,
    update
} from '../controllers/TriviaController'
import { createTriviaSchema, createTriviaGrupalSchema } from '../validations'
import { checkSchema } from 'express-validator';

const triviasRouter = Router()

triviasRouter.get('/', index)
triviasRouter.get('/plans', indexByPlan)
triviasRouter.get('/:id', show)
triviasRouter.get('/grupal/:token',showGrupal)
triviasRouter.post('/grupal',checkSchema(createTriviaGrupalSchema),storeGrupal )
triviasRouter.post('/', checkSchema(createTriviaSchema), store)
triviasRouter.put('/:id', upload.single('file'), checkSchema(createTriviaSchema), update)
triviasRouter.delete('/:id', destroy)

export default triviasRouter;
