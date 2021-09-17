import { Model } from 'objection'
import { DB_CONN } from '../config'
import User from './User';

class PasswordReset extends Model {
    // token!: string;
    // user_id!: number;
    
    static get tableName () {
        return 'password_resets'
    }

    static relationMappings = () => ({
        user: {
            relation: Model.HasManyRelation,
            modelClass: User,
            join: {
                from: 'password_resets.user_id',
                to: 'users.id'
            }
        }
    })
}

export default PasswordReset.bindKnex(DB_CONN)
