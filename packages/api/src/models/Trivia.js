import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class Trivia extends Model {
    static get tableName () {
        return 'trivias'
    }

    static relationMappings = () => ({
        subthemes: {
            relation: Model.HasManyRelation,
            modelClass: `${__dirname}/Subtheme`,
            join: {
                from: 'trivias.id',
                to: 'subthemes.trivia_id'
            }
        },
        level: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/Level`,
            join: {
                from: 'trivias.level_id',
                to: 'levels.id'
            }
        },
        category: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/Category`,
            join: {
                from: 'trivias.category_id',
                to: 'categories.id'
            }
        },
    })
}
