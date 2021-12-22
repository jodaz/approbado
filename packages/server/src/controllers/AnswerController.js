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

    if (!reqErrors) {

        const model = await Answer.query().insert(req.body)

        return res.status(201).json(model)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Answer.query().findById(id)

    return res.status(201).json(model)
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { id } = req.params

        const model = await Answer.query().updateAndFetchById(id, req.body)

        return res.status(201).json(model)
    }
}

export const destroyByUserId = async (req, res) => {
    let user_id = parseInt(req.params.user_id)
    const model = await Answer.query().where('user_id',`${user_id}`).delete();

    return res.json(model);
}



export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Answer.query().findById(id).delete();

    return res.json(model);
}
