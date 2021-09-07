import { Model } from 'objection'
import { DB_CONN } from '../config'

class User extends Model {
    id!: number;
    names!: string;
    password!: string;
    email!: string;
    rol!: string;
    phone!: string;

    static get tableName () {
        return 'users'
    }
}

export default User.bindKnex(DB_CONN)
