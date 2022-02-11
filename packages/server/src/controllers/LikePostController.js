import { LikePost } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const store = async (req, res) => {
    const { user } = req
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        try {
            const { post_id } = req.body;

            const model = await LikePost.query().insert({
                post_id: post_id,
                user_id: user.id
            })

            return res.status(201).json(model)
        } catch (error) {
            console.log(error)

            return res.status(500).json(error)
        }
    }
}

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = LikePost.query()

        if (filter) {
            if (filter.post_id) {
                query.where('post_id', filter.post_id)
            }
            if (filter.users) {
                query.withGraphFetched('user')
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

        return res.status(500).json(error)
    }
}

/**
 * Delete all likes for a given user and post
 * @param {post_id} req
 * @param {number of deletions} res
 * @returns
 */
export const destroy = async (req, res) => {
    try {
        let post_id = parseInt(req.params.post_id)

        const model = await LikePost.query()
            .where('post_id', post_id)
            .where('user_id', req.user.id)
            .delete();

        return res.json(model);
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}
