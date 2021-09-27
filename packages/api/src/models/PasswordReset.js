import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class PasswordReset extends Model {
    static get tableName () {
        return 'password_resets'
    }

    static relationMappings = () => ({
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'password_resets.user_id',
                to: 'users.id'
            }
        }
    })
}
