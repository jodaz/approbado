import { Request, Response } from 'express'
import Level from '../models/Level'
import { ReqListQuery } from '../types'
import { validateRequest } from '../utils'

export const index = async (req: Request<any, any, ReqListQuery, any>, res: Response) => {
    const { page, perPage } = req.query

    const levels = await Level.query()
        .page(page, perPage)

    const { results: data, total } = levels;
    
    return res.json({
        data,
        total
    })
}

export const store = async (req: Request, res: Response) => {
    const reqErrors = await validateRequest(req, res);
    
    if (!reqErrors) {
        const { name } = req.body;
    
        const model = await Level.query().insert({
            name: name,
        })
    
        return res.status(201).json(model)
    }
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params

    const { name } = req.body;

    const model = await Level.query().updateAndFetchById(id, {
        name: name,
    })

    return res.status(201).json(model)
}

export const destroy = async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    const model = await Level.query().findById(id).delete().returning('*');
    
    return res.json(model);
}
