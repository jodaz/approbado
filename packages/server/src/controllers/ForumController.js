import { Post } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    const query = Post.query().select(
        Post.ref('*'),
        Post.relatedQuery('comments').count().as('commentsCount'),
    )

    if (filter) {
        if (filter.unanswered) {
            query.whereNotExists(Post.relatedQuery('comments'));
        }
    }
    if (sort && order) {
        switch (sort) {
            case 'comments':
                query.whereExists(Post.relatedQuery('comments'))
                    .orderBy(Post.relatedQuery('comments').count(), order);
                break;
            default:
                query.orderBy(sort, order);
                break;
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { categories_ids, ...rest } = req.body;

        const model = await Post.query().insert({
            created_by: req.user.id,
            ...rest
        });
        await model.$relatedQuery('categories').relate(categories_ids)

        return res.status(201).json(model)
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
