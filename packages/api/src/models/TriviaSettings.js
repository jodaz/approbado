import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class TriviaSettings extends Model {
    static get tableName () {
        return 'trivia_settings'
    }
}
