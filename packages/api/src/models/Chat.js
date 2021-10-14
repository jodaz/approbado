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
    })
}
