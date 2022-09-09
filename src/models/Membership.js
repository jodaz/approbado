import { BaseClass } from '../utils'

export class Membership extends BaseClass {
    static get tableName () {
        return 'memberships'
    }

    static relationMappings = () => ({
        owner: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'memberships.user_id',
                to: 'users.id'
            }
        },
        plans: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Plan`,
            join: {
                from: 'memberships.plan_id',
                to: 'plans.id'
            }
        },
        payment: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Payment`,
            join: {
                from: 'memberships.user_id',
                to: 'payments.id'
            }
        }
    })
}
