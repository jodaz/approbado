import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class BaseClass extends Model {
    $beforeInsert() {
        this.created_at = new Date().toISOString();
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }
}
