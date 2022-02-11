import { Router } from "express"
import { store, index, destroy} from '../controllers/LikePostController'
import { createLikeSchema } from '../validations'
import { checkSchema } from 'express-validator';

const likeRoutes = Router()

likeRoutes.get('/', index)
likeRoutes.post('/', checkSchema(createLikeSchema), store)
likeRoutes.delete('/:post_id', destroy)

export default likeRoutes;
