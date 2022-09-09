import { BaseClass } from '../utils'

export class ChatUser extends BaseClass {
    static get tableName () {
        return 'chats_users'
    }

    static relationMappings = () => ({
        chat: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Chat`,
            join: {
                from: 'chats_users.chat_id',
                to: 'chats.id'
            }
        },
        user: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'chats_users.user_id',
                to: 'users.id'
            }
        }
    })
}
