import { Model } from 'objection'
import { DB_CONN } from '../config'

Model.knex(DB_CONN)

export class User extends Model {
    static get tableName () {
        return 'users'
    }

    static relationMappings = () => ({
        memberships: {
            relation: Model.HasManyRelation,
            modelClass: `${__dirname}/Membership`,
            join: {
                from: 'users.id',
                to: 'memberships.user_id'
            }
        },
        payments: {
            relation: Model.HasManyRelation,
            modelClass: `${__dirname}/Payment`,
            join: {
                from: 'users.id',
                to: 'payments.user_id'
            }
        },
        profile: {
            relation: Model.HasOneRelation,
            modelClass: `${__dirname}/Profile`,
            join: {
                from: 'users.id',
                to: 'profiles.user_id'
            }
        },
        authProviders: {
            relation: Model.HasManyRelation,
            modelClass: `${__dirname}/AuthenticationProvider`,
            join: {
                from: 'users.id',
                to: 'authentication_providers.user_id'
            }
        },
        blacklisted: {
            relation: Model.HasOneRelation,
            modelClass: `${__dirname}/BlacklistedUser`,
            join: {
                from: 'users.id',
                to: 'blacklisted_users.user_id'
            }
        },
        notifications: {
            relation: Model.HasOneRelation,
            modelClass: `${__dirname}/NotificationSettings`,
            join: {
                from: 'users.id',
                to: 'notification_settings.user_id'
            }
        },
        password_resets: {
            relation: Model.HasManyRelation,
            modelClass: `${__dirname}/PasswordReset`,
            join: {
                from: 'users.id',
                to: 'password_resets.user_id'
            }
        }
    })
}
