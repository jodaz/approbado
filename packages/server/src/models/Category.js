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
        },
        forums: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/Forum`,
            join: {
                from: 'categories.id',
                through: {
                    from: 'categories_forums.category_id',
                    to: 'categories_forums.forum_id'
                },
                to: 'forums.id'
            }
        }
    })
}
