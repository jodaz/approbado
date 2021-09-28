import { BaseClass } from '../utils'

export class Level extends BaseClass {
    static get tableName () {
        return 'levels'
    }

    static relationMappings = () => ({
        trivias: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Trivia`,
            join: {
                from: 'levels.id',
                to: 'trivias.level_id'
            }
        }
    })
}
