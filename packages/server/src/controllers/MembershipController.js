import { Membership } from '../models'
import { paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query

    const query = Membership.query()

    if (filter) {
        if (filter.active) {
            query.where('active', filter.active)
        }
    }

    return paginatedQueryResponse(query, req, res)
}
