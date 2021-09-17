import { Model } from 'objection'
import { DB_CONN } from '../config'

class Subtheme extends Model {
    static get tableName () {
        return 'subthemes'
    }
}

export default Subtheme.bindKnex(DB_CONN)
