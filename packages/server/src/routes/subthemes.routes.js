import { Router } from "express"
import { destroy, index, store,showRandom ,update, show } from '../controllers/SubthemeController'
import { createSubthemeSchema } from '../validations'
import { checkSchema } from 'express-validator';

const subthemesRoutes = Router()

subthemesRoutes.get('/', index)
subthemesRoutes.get('/:id', show)
subthemesRoutes.get('/trivia/random',showRandom)
subthemesRoutes.post('/', checkSchema(createSubthemeSchema), store)
subthemesRoutes.put('/:id', checkSchema(createSubthemeSchema), update)
subthemesRoutes.delete('/:id', destroy)

export default subthemesRoutes;
