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
        },
        trivias: {
            relation: Model.ManyToManyRelation,
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
