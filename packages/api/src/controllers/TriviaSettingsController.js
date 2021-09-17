import { Request, Response } from 'express'
import TriviaSettings from '../models/TriviaSettings'
import { validateRequest } from '../utils'

export const show = async (req, res) => {
    const settings = await TriviaSettings.query().first()

    return res.status(201).json(settings)
}

export const update = async (req, res) => {
    const { id } = req.params

    const { grant_certification, time_limit } = req.body;

    const model = await TriviaSettings.query().updateAndFetchById(id, {
        time_limit: time_limit,
        grant_certification: grant_certification
    })

    return res.status(201).json(model)
}

