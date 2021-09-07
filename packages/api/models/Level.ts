import { Model } from 'objection'
import { DB_CONN } from '../config'

class Level extends Model {
    name!: string;
    
    static get tableName () {
        return 'levels'
    }
}

export default Level.bindKnex(DB_CONN)
