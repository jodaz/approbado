import { BaseClass } from '../utils'

export class Subtheme extends BaseClass {
    static get tableName () {
        return 'subthemes'
    }

    static relationMappings = () => ({
        trivia: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Trivia`,
            join: {
                from: 'subthemes.trivia_id',
                to: 'trivias.id'
            }
        }
    })
}
