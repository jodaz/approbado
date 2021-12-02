import { Chat, Message } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query
    const { id: currUserId } = req.user;

    const query = Chat.query()
        .select('chats.*')
        .join('chats_users', 'chats.id', 'chats_users.chat_id')
        .join('users', 'chats_users.user_id', 'users.id')
        .where('chats_users.user_id', currUserId)

    if (filter) {
        if (filter.name) {
            query.where('users.user_name', 'ilike', `%${filter.name}%`)
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

        const data = await model.$fetchGraph('participants');

        return res.status(201).json(data)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Chat.query()
        .findById(id)
        .withGraphFetched('[participants,messages.user]');

    return res.status(201).json(model)
}

export const storeMessage = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { id } = req.params
        const { id: currUserId } = req.user;
        let data = req.body;

        if (req.file) {
            data.file = req.file.path;
        }
        data.chat_id = id
        data.user_id = currUserId

        const model = await Message.query().insert(data)

        return res.status(201).json(model)
    }
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

        const data = await model.$fetchGraph('participants');

        return res.status(201).json(data)
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Chat.query().findById(id).delete();

    return res.json(model);
}
