import { Report,ReportReason } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query
    const query = ReportReason.query()

    if (filter) {
        if (filter.item) {
            query.where('item', 'ilike', `%${filter.item}%`)
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const model = await Report.query().insert(req.body)

        return res.status(201).json(model)
    }
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { id } = req.params
        const model = await Report.query()
            .updateAndFetchById(id, req.body)

        return res.status(201).json(model)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Report.query().findById(id)

    return res.status(201).json(model)
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Report.query().findById(id).delete().first();

    return res.json(model);
}
