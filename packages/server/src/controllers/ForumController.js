import { Post, User} from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = Post.query().select(
            Post.ref('*'),
            Post.relatedQuery('comments').count().as('commentsCount'),
            Post.relatedQuery('likes').count().as('likesCount'),
        )
        .where('parent_id', null)
        .withGraphFetched('owner')
        .withGraphFetched('categories')

        if (filter) {
            if (filter.unanswered) {
                query.whereNotExists(Post.relatedQuery('comments'));
            }
            if (filter.message) {
                query.where('message', 'ilike', `%${filter.message}%`)
                    .orWhere('summary', 'ilike', `%${filter.message}%`)
            }
            if (filter.user_id) {
                query.where('created_by', '=', filter.user_id)
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
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const byUserId = async (req, res) => {
    const { user_id } = req.params

    const { filter, page, perPage } = req.query

    try {
        const user = await  User.query().findById(user_id)

        const data = user.$relatedQuery('posts').select(
            Post.ref('*'),
            Post.relatedQuery('comments').count().as('commentsCount'),
            Post.relatedQuery('likes').count().as('likesCount'),
        ).where('parent_id', null)

        if (filter) {
            if (filter.message) {
                data.where('message', 'ilike', `%${filter.message}%`).orWhere('summary', 'ilike', `%${filter.message}%`)
            }
        }

        const {
            results: posts
        } = await data.page(parseInt(page), parseInt(perPage))

        for (var i = 0; i < posts.length; i++) {
            posts[i].categories = await posts[i].$relatedQuery('categories')
            posts[i].user = user
        }

        return res.status(200).json(posts)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        try {
            const { categories_ids, ...rest } = req.body;

            const model = await Post.query().insert({
                created_by: req.user.id,
                type: 'Foro',
                ...rest
            });

            await model.$relatedQuery('categories').relate(categories_ids)

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
        const model = await Post.query().findById(id).select(
                Post.ref('*'),
                Post.relatedQuery('comments').count().as('commentsCount')
            )
            .where('type', 'Foro')
            .withGraphFetched('[owner,categories,trivia]')

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
            const { categories_ids, ...rest } = req.body;

            const model = await Post.query().updateAndFetchById(id, rest)

            await model.$relatedQuery('categories').unrelate()
            await model.$relatedQuery('categories').relate(categories_ids)

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
