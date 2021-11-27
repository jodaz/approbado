import { Post, User} from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    const query = Post.query().select(
        Post.ref('*'),
        Post.relatedQuery('comments').count().as('commentsCount'),
    ).where('parent_id', null)

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

export const byUserId = async (req, res) => {
    const { user_id } = req.params
    
    const user = await  User.query().findById(user_id)
    
    const posts = await user.$relatedQuery('posts').select(
        Post.ref('*'),
        Post.relatedQuery('comments').count().as('commentsCount'),
    ).where('parent_id', null)

    for (var i = 0; i < posts.length; i++) {
        posts[i].categories = await posts[i].$relatedQuery('categories')
        posts[i].user = user
    }

    return res.status(200).json(posts)
}

export const index_mobile = async (req, res) => {
    const { filter, sort, order } = req.query

    const query = Post.query().select(
        Post.ref('*'),
        Post.relatedQuery('comments').count().as('commentsCount'),
    ).where('parent_id', null)

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

    const { page, perPage } = req.query

    const {
        total,
        results: data
    } = await query.page(parseInt(page), parseInt(perPage))

    for (var i = 0; i < data.length; i++) {
        data[i].categories = await data[i].$relatedQuery('categories')
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
