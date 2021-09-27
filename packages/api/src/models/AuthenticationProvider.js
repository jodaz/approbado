import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class AuthenticationProvider extends Model {
    static get tableName () {
        return 'authentication_providers'
    }

    static relationMappings = () => ({
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'authentication_providers.user_id',
                to: 'users.id'
            }
        }
    })
}
