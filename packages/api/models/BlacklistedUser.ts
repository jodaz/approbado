import { Model } from 'objection'
import { DB_CONN } from '../config'

class BlacklistedUser extends Model {
    is_restricted!: boolean;
    
    static get tableName () {
        return 'blacklisted_users'
    }
}

export default BlacklistedUser.bindKnex(DB_CONN)
