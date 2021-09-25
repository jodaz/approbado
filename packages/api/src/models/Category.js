import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class Category extends Model {
    static get tableName () {
        return 'categories'
    }

    static relationMappings = () => ({
        memberships: {
            relation: Model.HasManyRelation,
            modelClass: `${__dirname}/Trivia`,
            join: {
                from: 'categories.id',
                to: 'trivias.category_id'
            }
        }
    })
}
