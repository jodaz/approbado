import { BaseClass } from '../utils'

export class Award extends BaseClass {
    static get tableName () {
        return 'awards'
    }

    static relationMappings = () => ({
        trivia: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Trivia`,
            join: {
                from: 'awards.trivia_id',
                to: 'trivias.id'
            }
        },
        subthemes: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Subtheme`,
            join: {
                from: 'awards.id',
                to: 'subthemes.award_id'
            }
        }
    })
}
