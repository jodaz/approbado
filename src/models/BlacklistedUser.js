import { BaseClass } from '../utils'

export class BlacklistedUser extends BaseClass {
    static get tableName () {
        return 'blacklisted_users'
    }

    static relationMappings = () => ({
        user: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'blacklisted_users.user_id',
                to: 'users.id'
            }
        },
    })
}
