import { BaseClass } from '../utils'

export class NotificationSettings extends BaseClass {
    static get tableName () {
        return 'notification_settings'
    }

    static relationMappings = () => ({
        user: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'notification_settings.user_id',
                to: 'users.id'
            }
        }
    })
}
