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
        posts: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/Post`,
            join: {
                from: 'categories.id',
                through: {
                    from: 'categories_posts.category_id',
                    to: 'categories_posts.post_id'
                },
                to: 'posts.id'
            }
        }
    })
}
