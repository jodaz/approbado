import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class NotificationSettings extends Model {
    static get tableName () {
        return 'notification_settings'
    }

    static relationMappings = () => ({
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'notification_settings.user_id',
                to: 'users.id'
            }
        }
    })
}
