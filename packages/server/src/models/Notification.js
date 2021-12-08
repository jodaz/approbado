import { BaseClass } from '../utils'

export class Notification extends BaseClass {
    static get tableName () {
        return 'notifications'
    }

    static relationMappings = () => ({
        users : {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'notifications.id',
                through: {
                    from: 'user_notifications.notification_id',
                    to: 'user_notifications.user_id'
                },
                to: 'users.id'
            }
        },
        user: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'users.id',
                to: 'notifications.created_by'
            }
        },
    })
}
