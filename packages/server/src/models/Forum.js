import { BaseClass } from '../utils'

export class Forum extends BaseClass {
    static get tableName () {
        return 'forums'
    }

    static relationMappings = () => ({
        owner: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'forums.created_by',
                to: 'users.id'
            }
        },
        categories: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/Category`,
            join: {
                from: 'forums.id',
                through: {
                    from: 'categories_forums.forums_id',
                    to: 'categories_forums.category_id'
                },
                to: 'categories.id'
            }
        },
        comments: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Comment`,
            join: {
                from: 'forums.id',
                to: 'comments.forum_id'
            }
        }
    })
}
