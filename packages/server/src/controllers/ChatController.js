import { Chat } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query
    const { id: currUserId } = req.user;

    const query = Chat.query()
        .select('chats.*')
        .join('chats_users', 'chats.id', 'chats_users.chat_id')
        .where('chats_users.user_id', currUserId)

    if (filter) {
        if (filter.name) {
            query.where('name', 'ilike', `%${filter.name}%`)
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { users_ids, ...rest } = req.body;
        const { id: currUserId } = req.user;

        const ids = [currUserId, ...users_ids];

        const model = await Chat.query().insert(rest)
        await model.$relatedQuery('participants').relate(ids)

        return res.status(201).json(model)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Chat.query()
        .findById(id)
        .withGraphFetched('participants');

    return res.status(201).json(model)
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { users_ids, ...rest } = req.body;
        const { id: currUserId } = req.user;

        const ids = [currUserId, ...users_ids];

        const model = await Chat.query()
            .updateAndFetchById(id, rest)

        await model.$relatedQuery('participants').unrelate()
        await model.$relatedQuery('participants').relate(ids)

        return res.status(201).json(model)
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Chat.query().findById(id).delete();

    return res.json(model);
}
