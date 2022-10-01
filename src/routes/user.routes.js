import { Router } from "express"
import { checkSchema } from 'express-validator'
import {
    destroy,
    show,
    index,
    store,
    update,
    update_mobile,
    showByUsername,
    download
} from '../controllers/UserController'
import {
    validateUserSchema,
    validateByID,
    validateByUsername
} from '../validations'
import multer from 'multer';
import path from 'path';

let storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname, '../../public'))
    },
    filename:(req, file, cb) => {
	   cb(null, Date.now()+'-'+file.originalname);
    }
})

const upload = multer({ storage });

const usersRouter = Router()

usersRouter.get('/', index)
usersRouter.get('/download', download)
usersRouter.get('/:id', checkSchema(validateByID), show)
usersRouter.get('/profile/:username', checkSchema(validateByUsername), showByUsername)
usersRouter.post('/', checkSchema(validateUserSchema), store)
usersRouter.put('/:id', update)
usersRouter.put('/mobile/:id', upload.single('picture'), update_mobile)
usersRouter.delete('/:id', destroy)

export default usersRouter;
