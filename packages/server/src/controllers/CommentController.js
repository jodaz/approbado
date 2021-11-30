import { Post } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query

    const query = Post.query().select(
        Post.ref('*'),
        Post.relatedQuery('comments').count().as('commentsCount'),
        Post.relatedQuery('likes').count().as('likesCount'),
        Post.relatedQuery('likes').where('user_id',req.user.id).count().as('likeUser'),
    )

    if (filter) {
        if (filter.id) {
            query.where('parent_id', filter.id)
        }
    }

    
    const { page, perPage } = req.query

    const {
        total,
        results: data
    } = await query.page(parseInt(page), parseInt(perPage))

    for (var i = 0; i < data.length; i++) {
        data[i].user =  await data[i].$relatedQuery('owner')
    }

    return res.status(200).json({
        data,
        total
    })
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { ...rest } = req.body;

        const model = await Post.query().insert({
            created_by: req.user.id,
            ...rest
        });

        return res.status(200).json(model)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Post.query().findById(id)

    return res.status(201).json(model)
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { id } = req.params

        const model = await Post.query().updateAndFetchById(id, req.body)

        return res.status(201).json(model)
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Post.query().findById(id).delete();

    return res.json(model);
}
