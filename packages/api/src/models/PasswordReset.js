import { BaseClass } from '../utils'

export class PasswordReset extends BaseClass {
    static get tableName () {
        return 'password_resets'
    }

    static relationMappings = () => ({
        user: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'password_resets.user_id',
                to: 'users.id'
            }
        }
    })
}
