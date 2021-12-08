import { Message } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query
    const { id: currUserId } = req.user;

    const query = Message.query()
        .where('user_id', currUserId)

    if (filter) {
        if (filter.chat_id) {
            query.where('chat_id', 'ilike', `%${filter.chat_id}%`)
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        let data = req.body;

        if (req.file) {
            data.file = req.file.path;
        }
        data.chat_id = req.filter.chat_id

        const model = await Chat.query().insert(data)

        return res.status(201).json(model)
    }
}

