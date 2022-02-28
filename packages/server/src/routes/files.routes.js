import { Router } from "express"
import { upload } from '../config'
import {
    destroy,
    index,
    show,
    store,
    download,
    update
} from '../controllers/FileController'

const filesRouter = Router()

filesRouter.get('/', index)
filesRouter.get('/:id', show)
filesRouter.get('/download/:id', download)
filesRouter.post('/', upload.single('file'), store)
filesRouter.put('/:id', upload.single('file'), update)
filesRouter.delete('/:id', destroy)

export default filesRouter;
