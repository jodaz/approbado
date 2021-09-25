import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class Level extends Model {
    static get tableName () {
        return 'levels'
    }

    static relationMappings = () => ({
        memberships: {
            relation: Model.HasManyRelation,
            modelClass: `${__dirname}/Trivia`,
            join: {
                from: 'levels.id',
                to: 'trivias.level_id'
            }
        }
    })
}
