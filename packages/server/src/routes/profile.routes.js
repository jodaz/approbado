import { Router } from "express"
import { show, update } from '../controllers/ProfileController'
import { upload } from '../config'

const profileRouter = Router()

profileRouter.get('/', show)
profileRouter.post('/', upload.single('file'), update)

export default profileRouter;
