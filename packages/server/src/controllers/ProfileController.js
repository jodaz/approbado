import { Profile } from '../models'

export const show = async (req, res) => {
    const { user } = req;

    const profile = await Profile.query().where('user_id', '=', user.id)

    return res.status(201).json({
        data: profile
    })
}

export const update = async (req, res) => {
    const { user, body } = req

    await user.$relatedQuery('profile').update(body)

    return res.status(201).json({ data: body })
}
