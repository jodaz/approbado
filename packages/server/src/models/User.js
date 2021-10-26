import { BaseClass } from '../utils'

export class User extends BaseClass {
    static get tableName () {
        return 'users'
    }

    static relationMappings = () => ({
        memberships: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Membership`,
            join: {
                from: 'users.id',
                to: 'memberships.user_id'
            }
        },
        payments: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Payment`,
            join: {
                from: 'users.id',
                to: 'payments.user_id'
            }
        },
        profile: {
            relation: BaseClass.HasOneRelation,
            modelClass: `${__dirname}/Profile`,
            join: {
                from: 'users.id',
                to: 'profiles.user_id'
            }
        },
        authProviders: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/AuthenticationProvider`,
            join: {
                from: 'users.id',
                to: 'authentication_providers.user_id'
            }
        },
        blacklisted: {
            relation: BaseClass.HasOneRelation,
            modelClass: `${__dirname}/Blacklisted`,
            join: {
                from: 'users.id',
                to: 'blacklisted.user_id'
            }
        },
        password_resets: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/PasswordReset`,
            join: {
                from: 'users.id',
                to: 'password_resets.user_id'
            }
        },
        messages: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Message`,
            join: {
                from: 'users.id',
                to: 'messages.user_id'
            }
        },
    })
}
