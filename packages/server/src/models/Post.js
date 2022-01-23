import { BaseClass } from '../utils'

export class Post extends BaseClass {
    static get tableName () {
        return 'posts'
    }

    static relationMappings = () => ({
        trivia: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Trivia`,
            join: {
                from: 'posts.trivia_id',
                to: 'trivias.id'
            }
        },
        owner: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'posts.created_by',
                to: 'users.id'
            }
        },
        likes: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/LikePost`,
            join: {
                from: 'posts.id',
                to: 'like_posts.post_id'
            }
        },
        categories: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/Category`,
            join: {
                from: 'posts.id',
                through: {
                    from: 'categories_posts.post_id',
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
        report: {
            relation: BaseClass.HasOneRelation,
            modelClass: `${__dirname}/Report`,
            join: {
                from: 'posts.id',
                to: 'reports.post_id'
            }
        }
    })
}
