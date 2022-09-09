import { BlacklistedUser, User } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = BlacklistedUser.query()
            .withGraphFetched('user')

        if (filter) {
            if (filter.name) {
                query.where('name', 'ilike', filter.name)
            }
            if (filter.is_restricted) {
                query.where('is_restricted', '=', filter.is_restricted)
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

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { user_id, is_restricted } = req.body;

        try {
            const model = await BlacklistedUser.query().insert({
                is_restricted: is_restricted,
                user_id: user_id
            })

            return res.status(201).json(model)
        } catch (error) {
            console.log(error)

            return res.status(500).json({ error: error })
        }
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    try {
        const model = await User.query().findById(id)
            .whereExists(
                BlacklistedUser.query()
                    .select(1)
                    .whereColumn('users.id', 'blacklisted_users.user_id')
                    .where('is_restricted', false)
            ).withGraphFetched('blacklisted')

        if (!model) return res.status(404).json({ error: 'not found' })

        return res.status(201).json(model)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { user_id, is_restricted } = req.body;

        try {
            const model = await BlacklistedUser.query()
                .where('user_id', user_id)
                .update({
                    is_restricted: is_restricted,
                    user_id: user_id
                })

            return res.status(201).json(model)
        } catch (error) {
            console.log(error)

            return res.status(500).json({ error: error })
        }
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)

    try {
        const model = await BlacklistedUser.query().where('user_id', id).delete();

        return res.json(model);
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}
