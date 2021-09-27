import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class BlacklistedUser extends Model {
    static get tableName () {
        return 'blacklisted_users'
    }

    static relationMappings = () => ({
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'blacklisted_users.user_id',
                to: 'users.id'
            }
        }
    })
}
