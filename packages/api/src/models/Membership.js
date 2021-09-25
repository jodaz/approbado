import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class Membership extends Model {
    static get tableName () {
        return 'memberships'
    }

    static relationMappings = () => ({
        owner: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'memberships.user_id',
                to: 'users.id'
            }
        },
        plans: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/Plan`,
            join: {
                from: 'memberships.plan_id',
                to: 'plans.id'
            }
        },
        payment: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/Payment`,
            join: {
                from: 'memberships.user_id',
                to: 'payments.id'
            }
        }
    })
}
