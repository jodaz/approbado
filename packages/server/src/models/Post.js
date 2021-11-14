import { BaseClass } from '../utils'

export class Post extends BaseClass {
    static get tableName () {
        return 'posts'
    }

    static relationMappings = () => ({
        owner: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'posts.created_by',
                to: 'users.id'
            }
        },
        categories: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/Category`,
            join: {
                from: 'posts.id',
                through: {
                    from: 'categories_posts.posts_id',
                    to: 'categories_posts.category_id'
                },
                to: 'categories.id'
            }
        },
        parent: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Post`,
            join: {
                from: 'posts.parent_id',
                to: 'posts.id'
            }
        },
        comments: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Post`,
            join: {
                from: 'posts.id',
                to: 'posts.parent_id'
            }
        },
    })
}
