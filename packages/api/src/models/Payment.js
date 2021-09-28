import { BaseClass } from '../utils'

export class Payment extends BaseClass {
    static get tableName () {
        return 'payments'
    }

    static relationMappings = () => ({
        membership: {
            relation: BaseClass.HasOneRelation,
            modelClass: `${__dirname}/Membership`,
            join: {
                from: 'payments.id',
                to: 'memberships.payment_id'
            }
        },
        plan: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Plan`,
            join: {
                from: 'payments.plan_id',
                to: 'plans.id'
            }
        },
        user: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'payments.user_id',
                to: 'users.id'
            }
        }
    })
}
