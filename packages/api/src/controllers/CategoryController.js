import { Category } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query

    const query = Category.query()

    if (filter) {
        if (filter.name) {
            query.where('name', filter.name)
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { name } = req.body;

        const model = await Category.query().insert({
            name: name,
        })

        return res.status(201).json(model)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Category.query().findById(id)

    return res.status(201).json(model)
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { id } = req.params

        const model = await Category.query().updateAndFetchById(id, req.body)

        return res.status(201).json(model)
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Category.query().findById(id).delete();

    return res.json(model);
}
