import { Model } from 'objection'
import { DB_CONN } from '../config'

class NotificationSettings extends Model {
    id!: number;
    general_notifications!: boolean;
    account_updates!: boolean;
    chat!: boolean;
    on_mobile!: boolean;

    static get tableName () {
        return 'notification_settings'
    }
}

export default NotificationSettings.bindKnex(DB_CONN)
