import { Answer } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query

    const query = Answer.query()

    if (filter) {
        if (filter.name) {
            query.where('name', 'ilike', `%${filter.name}%`)
        }
        if (filter.user_id) {
            query.where('user_id',`${user_id}`)
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);
    const { user } = req;

    if (!reqErrors) {
        const { answers } = req.body

        const formmatedAnswers = answers.map(item => ({
            option_id: item.option_id,
            is_right: item.is_right,
            user_id: user.id
        }))

        await Answer.query().insert(formmatedAnswers)

        return res.status(201).json({ success: true })
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Answer.query().findById(id)

    return res.status(201).json(model)
}
