import { BaseClass } from '../utils'

export class Comment extends BaseClass {
    static get tableName () {
        return 'comments'
    }

    static relationMappings = () => ({
        user: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'comments.user_id',
                to: 'users.id'
            }
        },
        forum: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Forum`,
            join: {
                from: 'comments.forum_id',
                to: 'forums.id'
            }
        }
    })
}
