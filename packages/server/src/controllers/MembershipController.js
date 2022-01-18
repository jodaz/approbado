import { Membership,User } from '../models'
import { paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query

    const query = Membership.query()

    if (filter) {
        if (filter.active) {
            query.where('active', filter.active)
        }
        if (filter.user_id) {
            query.where('user_id', filter.user_id)
                .withGraphFetched('plans');
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const byUserId = async (req, res) => {
    const { user_id } = req.params

    const user = await User.query().findById(user_id)

    const memberships = await user.$relatedQuery('memberships').withGraphFetched('plans')

    return res.status(200).json(memberships)
}
