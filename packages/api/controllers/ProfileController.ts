import { Request, Response } from 'express'
import Profile from '../models/Profile'
import { validateRequest } from '../utils'

export const show = async (req: Request, res: Response) => {
    const settings = await Profile.query().where({
        user_id: req.user.id
    })

    return res.status(201).json(settings)
}

export const update = async (req: Request, res: Response) => {
    const id = req.user.id

    const model = await Profile.query().updateAndFetchById(id, req.body)

    return res.status(201).json(model)
}

