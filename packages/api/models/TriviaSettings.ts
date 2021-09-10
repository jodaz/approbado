import { Model } from 'objection'
import { DB_CONN } from '../config'

class TriviaSettings extends Model {
    grant_certification!: boolean;
    time_limit!: number;

    static get tableName () {
        return 'trivia_settings'
    }
}

export default TriviaSettings.bindKnex(DB_CONN)
