import { Plan } from '../models/Plan'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query

    const query = Plan.query()

    if (filter) {
        if (filter.name) {
            query.where('name', filter.name)
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const store = async (req, res) => {
    console.log(req.body)
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const model = await Plan.query().insert(req.body)

        return res.status(201).json(model)
    }
}

export const update = async (req, res) => {
    const { id } = req.params

    const model = await Plan.query().updateAndFetchById(id, req.body)

    return res.status(201).json(model)
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Plan.query().findById(id)

    return res.status(201).json(model)
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Plan.query().findById(id).delete().first();

    return res.json(model);
}
