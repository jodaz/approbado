import {
    Chat,
    Message,
    Notification,
    ChatUser
} from '../models'
import {
    validateRequest,
    paginatedQueryResponse,
    sendNotification
} from '../utils'

/**
 * Return all list of chats
 * @param {id} req Chat id
 * @param {*} res
 * @returns
 */
export const index = async (req, res) => {
    try {
        const { filter } = req.query
        const { id: currUserId } = req.user;

        const query = Chat.query()
            .select('chats.*')
            .join('chats_users', 'chats.id', 'chats_users.chat_id')
            .join('users', 'chats_users.user_id', 'users.id')
            .where('chats_users.user_id', currUserId)
            .withGraphFetched('[participants,messages,notification]')
            .modifyGraph('messages', (builder) => builder.orderBy('created_at', 'DESC')
            .limit(1));

        if (filter) {
            if (filter.name) {
                query.where('users.user_name', 'ilike', `%${filter.name}%`)
            }
            if (filter.status) {
                query.where('chats_users.status', filter.status)
            }
        }

        return paginatedQueryResponse(query, req, res)
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}

/**
 * Return all messages not read by user
 * @param {id} req Chat id
 * @param {*} res
 * @returns
 */
export const newMessages = async (req, res) => {
    try {
        const { id: currUserId } = req.user;

        const new_messages = await Message.query()
            .join('chats_users', 'chats_users.chat_id', 'messages.chat_id')
            .where('chats_users.user_id', currUserId)
            .whereRaw('read_at is null')
            .first()
            .count()

        return res.status(200).json({ new_messages : new_messages.count} )
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}


/**
 * Create a chat and an invitation
 * @param {id} req Chat id
 * @param {*} res
 * @returns
 */
export const store = async (req, res) => {
    try {
        const reqErrors = await validateRequest(req, res);

        if (!reqErrors) {
            const { users_ids, ...rest } = req.body;
            const { id: currUserId, names } = req.user;

            const ids = [currUserId, ...users_ids];
            const isPrivate = users_ids.length < 2;

            const model = await Chat.query().insert({
                ...rest,
                is_private: isPrivate
            })

            for (var i = 0; i < ids.length; i++) {
                let status = ids[i] == currUserId ? 'accepted' : 'pending'
                await model.$relatedQuery('participants')
                    .relate({ id: ids[i], status: status })
            }

            const participants = await model.$relatedQuery('participants')
                .select('users.*')
                .where('users.id', '!=', currUserId)

            let data_notification = {
                data: req.body.is_private ? `<b>${names}</b> te ha enviado una solicitud` : `<b>${names}</b> te ha enviado una invitación`,
                long_data: req.body.is_private ? `<b>${names}</b> te ha enviado una solicitud a un chat privado` : `<b>${names}</b> te ha enviado una invitación para formar parte de su grupo de debate “${req.body.name}”`,
                type: 'request',
                created_by: currUserId,
                chat_id: model.id
            }

            let data_push_notification = {
                title:  req.body.is_private ? 'Nueva solicitud de chat' : 'Nueva invitación de chat',
                body :   req.body.is_private ? `${names} te ha enviado una solicitud a un chat privado` : `${names} te ha enviado una invitación para formar parte de su grupo de debate “${req.body.name}”`,
                data : {
                    path : {
                        name : 'message'
                    },
                    message : 'Has recibido una nueva solicitud de chat'
                }
            }

            const notification = await Notification.query()
                .insert(data_notification)

            await notification.$relatedQuery('users')
                .relate(participants)

            const io = req.app.locals.io;

            io.emit('new_notification', participants)

            await sendNotification(data_push_notification, ids)

            model.chatStatus = 'accepted';
            model.participants = participants;

            return res.status(201).json(model)
        }
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}


/**
 * Return a list of messages from a chat
 * @param {id} req Chat id
 * @param {*} res
 * @returns
 */
export const show = async (req, res) => {
    const { id } = req.params

    try {
        const { id: currUserId } = req.user;

        const model = await Chat.query()
            .findById(id)
            .withGraphFetched('[messages.user, notification]');

        /**
         * Add current chat status for this user
         */
        const currChatStatus = await model
            .$relatedQuery('chatUser')
            .where('user_id', currUserId)
            .first();

        model.chatStatus = currChatStatus.status;

        model.participants = await model.$relatedQuery('participants')
            .select('users.*')
            .where('users.id', '!=', currUserId)

        return res.status(201).json(model)
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}

/**
 * Store a new message to a chat
 * @param {id} req Chat id
 * @param {*} res
 * @returns
 */
export const storeMessage = async (req, res) => {
    try {
        const reqErrors = await validateRequest(req, res);

        if (!reqErrors) {
            const { id } = req.params
            const { id: currUserId ,names } = req.user;
            let data = req.body;

            if (req.file) {
                console.log(req.file.filename)
                data.file = 'public/uploads/'+req.file.filename;
            }

            data.chat_id = id
            data.user_id = currUserId

            const model = await Message.query().insert(data)

            const chat = await model.$relatedQuery('chat')

            const participants = await chat.$relatedQuery('participants')
                .select('users.id')
                .where('users.id', '!=', currUserId)

            const data_notification = {
                data : `<b>${names}</b> te ha enviado un mensaje`,
                type : 'message',
                created_by : currUserId,
                chat_id : chat.id
            }

            const notification = await Notification.query().insert(data_notification)

            await notification.$relatedQuery('users').relate(participants)

            const io = req.app.locals.io;

            io.emit('new_message', {
                created_by: currUserId,
                chat_id: data.chat_id,
                participants
            })
            io.emit('new_notification', notification)

            const message = await model.$fetchGraph('user');

            return res.status(201).json(message)
        }
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}

export const update = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}

export const updateStatus = async (req, res) => {
    try {
        const reqErrors = await validateRequest(req, res);

        if (!reqErrors) {
            const { chat_id } = req.params
            const { status } = req.body

            const chat_user = await ChatUser.query()
                .where('user_id', req.user.id)
                .where('chat_id', chat_id)
                .update({ status: status })

            const io = req.app.locals.io;

            io.emit('new_message', req.user.id)

            return res.status(201).json(chat_user)
        }
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}

export const updateReadAt = async (req, res) => {
    try {
        const { chat_id } = req.params

        const chat_user = await Message.query()
            .whereRaw('read_at is null')
            .where('chat_id',chat_id)
            .update({read_at : new Date() })

        return res.status(201).json(chat_user)
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}

/**
 * Delete a chat for an user
 * @param {id} req Chat id
 * @param {*} res
 * @returns
 */
export const destroy = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        const { id: currUserId } = req.user;

        const chat = await Chat.query().findById(id).delete();
        const chatUser = await ChatUser.query()
            .where('chat_id', id)
            .where('user_id',currUserId)
            .delete();

        return res.json({ chat, chatUser });
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}
