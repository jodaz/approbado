import { Request, Response } from 'express'
import User from '../models/User'

export const index = async (req: Request, res: Response) => {
    const users = await User.query();

    return res.json(users);
}
