import { Profile } from '../models'

export const show = async (req, res) => {
    const { user } = req;

    const profile = await Profile.query().where('user_id', '=', user.id)

    return res.status(201).json({
        data: profile
    })
}

export const update = async (req, res) => {
    const id = req.user.id

    const model = await Profile.query().updateAndFetchById(id, req.body)

    return res.status(201).json(model)
}
