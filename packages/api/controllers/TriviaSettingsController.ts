import { Request, Response } from 'express'
import TriviaSettings from '../models/TriviaSettings'
import { validateRequest } from '../utils'

export const show = async (req: Request, res: Response) => {
    const settings = await TriviaSettings.query().first()

    return res.status(201).json(settings)
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params

    const { name } = req.body;

    const model = await TriviaSettings.query().updateAndFetchById(id, {
        name: name,
    })

    return res.status(201).json(model)
}

