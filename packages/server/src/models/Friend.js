import { BaseClass } from '../utils'

export class Friend extends BaseClass {
    static get tableName () {
        return 'friends'
    }

    static relationMappings = () => ({
        user: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'friends.user_id',
                to: 'users.id'
            }
        },
        friend: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'friends.friend_id',
                to: 'users.id'
            }
        },
    })
}
