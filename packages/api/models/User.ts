import { Model } from 'objection'
import { DB_CONN } from '../config'
import Profile from './Profile'

class User extends Model {
    id!: number;
    names!: string;
    password!: string;
    email!: string;
    rol!: string;
    phone!: string;

    profile?: typeof Profile;
    
    static get tableName () {
        return 'users'
    }

    static relationMappings = () => ({
        pets: {
            relation: Model.HasOneRelation,
            modelClass: Profile,
            join: {
                from: 'users.id',
                to: 'profiles.user_id',
            },
        },
    })
}

export default User.bindKnex(DB_CONN)
