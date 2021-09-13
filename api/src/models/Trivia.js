import { Model } from 'objection'
import { DB_CONN } from '../config'

class Trivia extends Model {
    static get tableName () {
        return 'trivias'
    }
}

export default Trivia.bindKnex(DB_CONN)
