import { Model } from 'objection'
import knex from '../config/model'

class User extends Model {
    static get tableName () {
        return 'users'
    }
}

export default User.bindKnex(knex)