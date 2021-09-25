import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class Profile extends Model {
    static get tableName () {
        return 'profiles'
    }

    static relationMappings = () => ({
        owner: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'profiles.user_id',
                to: 'users.id'
            }
        }
    })
}
