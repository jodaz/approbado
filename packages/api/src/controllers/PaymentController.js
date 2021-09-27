import { Payment } from '../models'
import { paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query

    const query = Payment.query()

    if (filter) {
        if (filter.name) {
            query.where('name', filter.name)
        }
    }

    return paginatedQueryResponse(query, req, res)
}
