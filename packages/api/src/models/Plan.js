import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class Plan extends Model {
    static get tableName () {
        return 'plans'
    }

    static relationMappings = () => ({
        memberships: {
            relation: Model.HasManyRelation,
            modelClass: `${__dirname}/Membership`,
            join: {
                from: 'plans.id',
                to: 'memberships.plan_id'
            }
        }
    })
}
