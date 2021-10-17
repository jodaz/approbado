import { BaseClass } from '../utils'

export class Message extends BaseClass {
    static get tableName () {
        return 'messages'
    }

    static relationMappings = () => ({
        chat: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Chat`,
            join: {
                from: 'messages.chat_id',
                to: 'chats.id'
            }
        },
        user: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'messages.user_id',
                to: 'users.id'
            }
        },
    })
}
