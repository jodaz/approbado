import { Category, Post } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = Category.query()

        if (filter) {
            if (filter.name) {
                query.where('name', 'ilike', `%${filter.name}%`)
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
        const { name } = req.body;

        try {
            const model = await Category.query().insert({
                name: name,
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
        const model = await Category.query().findById(id)

        return res.status(201).json(model)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const showByForum = async (req, res) => {
    const { forum_id } = req.params

    try {
        const post = await Post.query().findById(forum_id)
        const categories = await post.$relatedQuery('categories')

        return res.status(200).json(categories)
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

            const model = await Category.query()
                .updateAndFetchById(id, req.body)

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
        const model = await Category.query().findById(id).delete();

        return res.json(model);
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}
