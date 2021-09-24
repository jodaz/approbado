import { Model } from 'objection'
import { DB_CONN } from '../config'

class Membership extends Model {
    static get tableName () {
        return 'memberships'
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

export default Membership.bindKnex(DB_CONN)
