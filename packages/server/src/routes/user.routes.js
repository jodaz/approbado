import { Router } from "express"
import { checkSchema } from 'express-validator'
import { destroy, show, index, store, update,update_mobile } from '../controllers/UserController'
import { validateUserSchema } from '../validations'
import multer from 'multer';
import path from 'path';

let storage = multer.diskStorage({
    destination:(req, file,cb)=>{
        cb(null, path.join(__dirname, '../../public'))
    },
    filename:(req, file, cb) => {
	   cb(null, Date.now()+'-'+file.originalname);
    }
})

const upload = multer({ storage });

const usersRouter = Router()

usersRouter.get('/', index)
usersRouter.get('/:id', show)
usersRouter.post('/', checkSchema(validateUserSchema),store)
usersRouter.put('/:id', update)
usersRouter.put('/mobile/:id', upload.single('picture'), update_mobile)
usersRouter.delete('/:id', destroy)

export default usersRouter;
