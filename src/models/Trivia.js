import { BaseClass } from '../utils'

export class Trivia extends BaseClass {
    static get tableName () {
        return 'trivias'
    }

    static relationMappings = () => ({
        subthemes: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Subtheme`,
            join: {
                from: 'trivias.id',
                to: 'subthemes.trivia_id'
            }
        },
        files: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/File`,
            join: {
                from: 'trivias.id',
                through: {
                    // persons_movies is the join table.
                    from: 'subthemes.trivia_id',
                    to: 'subthemes.id'
                },
                to: 'files.subtheme_id'
            }
        },
        awards: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Award`,
            join: {
                from: 'trivias.id',
                to: 'awards.trivia_id'
            }
        },
        level: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Level`,
            join: {
                from: 'trivias.level_id',
                to: 'levels.id'
            }
        },
        category: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Category`,
            join: {
                from: 'trivias.category_id',
                to: 'categories.id'
            }
        },
        plans: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/Plan`,
            join: {
                from: 'trivias.id',
                through: {
                    from: 'trivias_plans.trivia_id',
                    to: 'trivias_plans.plan_id'
                },
                to: 'plans.id'
            }
        }
    })
}
