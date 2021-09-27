import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class Payment extends Model {
    static get tableName () {
        return 'payments'
    }

    static relationMappings = () => ({
        membership: {
            relation: Model.HasOneRelation,
            modelClass: `${__dirname}/Membership`,
            join: {
                from: 'payments.id',
                to: 'memberships.payment_id'
            }
        },
        plan: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/Plan`,
            join: {
                from: 'payments.plan_id',
                to: 'plans.id'
            }
        },
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'payments.user_id',
                to: 'users.id'
            }
        }
    })
}
