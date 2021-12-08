import { BaseClass } from '../utils'

export class ChatUser extends BaseClass {
    static get tableName () {
        return 'chats_users'
    }
}
