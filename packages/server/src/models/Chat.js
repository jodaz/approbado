import { BaseClass } from '../utils'

export class Chat extends BaseClass {
    static get tableName () {
        return 'chats'
    }

    static relationMappings = () => ({
        messages: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Message`,
            join: {
                from: 'chats.id',
                to: 'messages.chat_id'
            }
        },
        participants: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'chats.id',
                through: {
                    from: 'chats_users.chat_id',
                    to: 'chats_users.user_id'
                },
                to: 'users.id'
            }
        },
    })
}
