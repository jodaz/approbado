import { Request, Response, query } from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'
import { ReqListQuery } from '../types'

export const index = async (req: Request<any, any, ReqListQuery, any>, res: Response) => {
    const { page, perPage } = req.query

    const users = await User.query()
        .page(page, perPage)

    const { results: data, total } = users;
    
    return res.json({
        data,
        total
    })
}

export const store = async (req: Request, res: Response) => {
    return res.json(req.body)
}

export const destroy = async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    const user = await User.query().findById(id).delete();
    
    return res.json(user);
}
