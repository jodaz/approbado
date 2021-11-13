import { Router } from "express"
import { upload } from '../config'
import { destroy, index, show, store, update } from '../controllers/FileController'
import { createFileSchema } from '../validations'
import { checkSchema } from 'express-validator';

const filesRouter = Router()

filesRouter.get('/', index)
filesRouter.get('/:id', show)
filesRouter.post('/', upload.single('file'), store)
filesRouter.put('/:id', upload.single('file'), update)
filesRouter.delete('/:id', destroy)

export default filesRouter;
