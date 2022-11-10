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
    delete_picture_profile,
    download
} from '../controllers/UserController'
import {
    validateUserSchema,
    validateByID,
    validateByUsername,
    updateUserMobileSchema
} from '../validations'
import multer from 'multer';
import path from 'path';

let storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname, '../../public/profiles'))
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
usersRouter.put('/delete_picture/:id',delete_picture_profile)
usersRouter.put('/mobile/:id', upload.single('picture'),checkSchema(updateUserMobileSchema), update_mobile)
usersRouter.delete('/:id', destroy)

export default usersRouter;
