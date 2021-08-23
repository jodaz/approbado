import { Request, Response } from 'express'
import User from '../models/User'

export const index = async (req: Request, res: Response) => {
    const users = await User.query();

    return res.json(users);
}

export const destroy = async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    const user = await User.query().findById(id).delete();
    
    return res.json(user);
}
