import { Model } from 'objection'
import { DB_CONN } from '../config'

class AuthenticationProvider extends Model {
    // provider_key!: string;
    // provider_type!: string;
    
    static get tableName () {
        return 'authentication_providers'
    }
}

export default AuthenticationProvider.bindKnex(DB_CONN)
