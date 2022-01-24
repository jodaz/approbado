import { ReportReason } from '../models'
import { paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = ReportReason.query()

        if (filter) {
            if (filter.item) {
                query.where('item', 'ilike', `%${filter.item}%`)
            }
        }

        if (sort && order) {
            switch (sort) {
                default:
                    query.orderBy(sort, order);
                    break;
            }
        }

        return paginatedQueryResponse(query, req, res)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    try {
        const model = await ReportReason.query().findById(id)

        return res.status(201).json(model)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}
