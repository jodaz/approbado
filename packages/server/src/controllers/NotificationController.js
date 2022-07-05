import { Notification, UserNotification, Chat, User } from '../models'
import { paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query
    const { user } = req;

    const query = user.$relatedQuery('notifications')
        .orderBy('notifications.created_at','DESC')
        .withGraphFetched('[user,chat]')

    if (filter) {
        // if (filter.name) {
        //     query.where('name', 'ilike', `%${filter.name}%`)
        // }
    }
    if (sort && order) {
        // query.orderBy(sort, order);
    }

    return paginatedQueryResponse(query, req, res)
}

export const showByUser = async (req, res) => {
    const { user_id } = req.params

    const user = await User.query().findById(user_id)

    const query = user.$relatedQuery('notifications')
        .orderBy('notifications.created_at','DESC')
        .withGraphFetched('user')

    return paginatedQueryResponse(query, req, res)
}

export const showByChat = async (req, res) => {
    const { chat_id } = req.params

    const chat = await Chat.query().findById(chat_id)
    const notification = await chat.$relatedQuery('notification').withGraphFetched('user')

    return res.status(200).json(notification)
}

export const newNotifications = async (req, res) => {
    const { id: currUserId } = req.user;

    const new_notifications = await Notification.query()
        .join('user_notifications', 'user_notifications.notification_id', 'notifications.id')
        .where('user_notifications.user_id', currUserId)
        .whereRaw('read_at is null')
        .first()
        .count()

    return res.status(200).json({ new_notifications : new_notifications.count} )
}

export const updateReadAt = async (req, res) => {
    let id = parseInt(req.params.id)

    const notification = await Notification.query().findById(id)

    const notification_ids = await Notification.query()
        .select('notifications.id')
        .join('user_notifications','user_notifications.notification_id','notifications.id')
        .whereRaw('read_at is null')
        .where('notifications.data',notification.data)

    let ids = ''

    for (var i = 0; i < notification_ids.length; i++) {
        ids += (i == notification_ids.length-1) ? notification_ids[i].id  :   notification_ids[i].id+','
    }

   let user_notification =  ids == '' ? false : await UserNotification.query()
        .whereRaw('notification_id in('+ids+')')
        .update({read_at : new Date() })

    return res.status(200).json(user_notification)
}

/**
 * Deletes a notification
 * @param {*} req (id of notification)
 * @returns deleted model
 */
export const destroy = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        const { user } = req;

        const model = await user.$relatedQuery('notifications')
            .where('notifications.id', id)
            .delete()
            .returning('*')
            .first();

        return res.json(model);
    } catch (error) {
        console.log(error);

        return res.status(500).json(error)
    }
}
