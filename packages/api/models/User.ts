import { Model } from 'objection'
import { DB_CONN } from '../config'

class User extends Model {
    static get tableName () {
        return 'users'
    }
}

export default User.bindKnex(DB_CONN)
