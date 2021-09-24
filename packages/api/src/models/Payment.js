import { Model } from 'objection'
import { DB_CONN } from '../config'

class Payment extends Model {
    static get tableName () {
        return 'payments'
    }

    // static relationMappings = () => ({
    //     pets: {
    //         relation: Model.HasOneRelation,
    //         modelClass: Profile,
    //         join: {
    //             from: 'users.id',
    //             to: 'profiles.user_id',
    //         },
    //     },
    // })
}

export default Payment.bindKnex(DB_CONN)
