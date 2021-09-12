import User from '../models/User'
import bcrypt from 'bcrypt'
import { validateRequest, getRandomPass } from '../utils'

export const index = async (req, res) => {
    const { page, perPage, filter } = req.query

    const users = await User.query()
        .page(page, perPage)

    const { results: data, total } = users;
    
    return res.json({
        data,
        total
    })
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);
    
    if (!reqErrors) {
        const { email, random_pass, password, name, access } = req.body;
    
        let realPassword = random_pass ? getRandomPass() : password;
        const encryptedPassword = await bcrypt.hash(realPassword, 10)
    
        const model = await User.query().insert({
            names: name,
            email: email,
            password: encryptedPassword,
            rol: access
        })
    
        return res.status(201).json(model)
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const user = await User.query().findById(id).delete();
    
    return res.json(user);
}
