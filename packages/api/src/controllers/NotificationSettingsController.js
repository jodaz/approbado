import NotificationSettings from '../models/NotificationSettings'
import { validateRequest } from '../utils'

export const show = async (req, res) => {
    const user = await req.user.id
    const settings = await NotificationSettings.query().where({ user_id: user });

    return res.status(201).json(settings)
}

export const update = async (req, res) => {
    const { id } = req.params

    const { grant_certification, time_limit } = req.body;

    const model = await NotificationSettings.query().updateAndFetchById(id, {
        time_limit: time_limit,
        grant_certification: grant_certification
    })

    return res.status(201).json(model)
}

