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
    })
}
