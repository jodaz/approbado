import { BaseClass } from '../utils'

export class AuthenticationProvider extends BaseClass {
    static get tableName () {
        return 'authentication_providers'
    }

    static relationMappings = () => ({
        user: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'authentication_providers.user_id',
                to: 'users.id'
            }
        }
    })
}
