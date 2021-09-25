import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class Subtheme extends Model {
    static get tableName () {
        return 'subthemes'
    }

    static relationMappings = () => ({
        trivia: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/Trivia`,
            join: {
                from: 'subthemes.trivia_id',
                to: 'trivias.id'
            }
        }
    })
}
