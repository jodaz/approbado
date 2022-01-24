import { Report, ReportReason } from '../models'
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

export const show = async (req, res) => {
    const { id } = req.params

    const model = await ReportReason.query().findById(id)

    return res.status(201).json(model)
}
