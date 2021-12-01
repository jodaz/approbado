import { Router } from "express"
import { store, byPostId, destroy} from '../controllers/LikePostController'
import { createLikeSchema } from '../validations'
import { checkSchema } from 'express-validator';

const likeRoutes = Router()

likeRoutes.get('/:post_id', byPostId)
likeRoutes.post('/',checkSchema(createLikeSchema), store)
likeRoutes.delete('/:post_id/:user_id', destroy)

export default likeRoutes;
