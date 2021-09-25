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
                from: 'memberships.payment_id',
                to: 'payment.id'
            }
        },
        user: {
            relation: Model.HasOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'payments.user_id',
                to: 'users.id'
            }
        }
    })
}
