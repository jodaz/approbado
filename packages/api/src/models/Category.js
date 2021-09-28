import { BaseClass } from '../utils'

export class Category extends BaseClass {
    static get tableName () {
        return 'categories'
    }

    static relationMappings = () => ({
        trivias: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Trivia`,
            join: {
                from: 'categories.id',
                to: 'trivias.category_id'
            }
        }
    })
}
