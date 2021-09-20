import { Model } from 'objection'
import { DB_CONN } from '../config'

class Plan extends Model {
    static get tableName () {
        return 'plans'
    }
}

export default Plan.bindKnex(DB_CONN)
