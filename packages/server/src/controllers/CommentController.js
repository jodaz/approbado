import { Comment } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query

    const query = Comment.query()

    if (filter) {
        if (filter.forum_id) {
            query.where('forum_id', filter.forum_id)
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { message, forum_id } = req.body;

        const model = await Comment.query().insert({
            message: message,
            forum_id: forum_id,
            user_id: req.user.id
        })

        return res.status(201).json(model)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Comment.query().findById(id)

    return res.status(201).json(model)
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { id } = req.params

        const model = await Comment.query().updateAndFetchById(id, req.body)

        return res.status(201).json(model)
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Comment.query().findById(id).delete();

    return res.json(model);
}
