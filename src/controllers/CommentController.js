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
        const io = req.app.locals.io;

        try {
            const { ...rest } = req.body;

            const model = await Post.query().insert({
                created_by: req.user.id,
                type: 'Comentario',
                ...rest
            }).withGraphFetched('owner')

            model.commentsCount = 0;
            model.likesCount = 0;

            await io.emit('new_comment', model);

            return res.status(200).json(model)
        } catch (error) {
            console.log(error)

            return res.status(500).json({ error: error })
        }
    }
}

export const show = async (req, res) => {
    const { id } = req.params
    const { user } = req

    try {
        const model = await Post.query()
            .findById(id)
            .select(
                Post.ref('*'),
                Post.relatedQuery('comments').count().as('commentsCount'),
                Post.relatedQuery('likes').count().as('likesCount'),
                Post.relatedQuery('likes').where('user_id', user.id).count().as('likeUser'),
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
        const io = req.app.locals.io;

        const model = await Post.query()
            .findById(id)
            .delete()
            .returning('*')
            .first();

        await io.emit('delete_comment', model);

        return res.json(model);
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}
