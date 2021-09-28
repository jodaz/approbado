import { BaseClass } from '../utils'

export class Plan extends BaseClass {
    static get tableName () {
        return 'plans'
    }

    static relationMappings = () => ({
        memberships: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Membership`,
            join: {
                from: 'plans.id',
                to: 'memberships.plan_id'
            }
        },
        trivias: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/Trivia`,
            join: {
                from: 'plans.id',
                through: {
                    from: 'trivias_plans.plan_id',
                    to: 'trivias_plans.trivia_id'
                },
                to: 'trivias.id'
            }
        }
    })
}
