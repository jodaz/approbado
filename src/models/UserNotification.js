import { BaseClass } from '../utils'

export class UserNotification extends BaseClass {
    static get tableName () {
        return 'user_notifications'
    }
}
