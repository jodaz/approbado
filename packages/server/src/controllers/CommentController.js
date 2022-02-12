import { Post } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = Post.query().select(
            Post.ref('*'),
            Post.relatedQuery('comments').count().as('commentsCount'),
            Post.relatedQuery('likes').count().as('likesCount'),
            Post.relatedQuery('likes').where('user_id', req.user.id).count().as('likeUser'),
        ).withGraphFetched('owner')

        if (filter) {
            if (filter.id) {
                query.where('parent_id', filter.id)
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
        try {
            const { ...rest } = req.body;

            const model = await Post.query().insert({
                created_by: req.user.id,
                type: 'Comentario',
                ...rest
            });

            return res.status(200).json(model)
        } catch (error) {
            console.log(error)

            return res.status(500).json({ error: error })
        }
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    try {
        const model = await Post.query()
            .findById(id)
            .select(
                Post.ref('*'),
                Post.relatedQuery('comments').count().as('commentsCount')
            )
            .where('type', 'Comentario')
            .withGraphFetched('owner')

        return res.status(201).json(model)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        try {
            const { id } = req.params

            const model = await Post.query().updateAndFetchById(id, req.body)

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
        const model = await Post.query().findById(id).delete();

        return res.json(model);
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}
