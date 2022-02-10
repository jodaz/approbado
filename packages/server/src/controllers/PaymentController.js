import { Payment } from '../models'
import { paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = Payment.query()
            .withGraphFetched('[user,plan]')

        if (filter) {
            if (filter.global_search) {
                query.where('payment_method', 'ilike', `%${filter.global_search}%`)
            }
        }

        if (sort && order) {
            console.log(sort);
            switch (sort) {
                case 'user.email':
                    break;
                case 'plan.name':
                    break;
                default:
                    query.orderBy(sort, order);
                    break;
            }
        }

        return paginatedQueryResponse(query, req, res)
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}
