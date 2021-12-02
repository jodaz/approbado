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
            modelClass: `${__dirname}/BlacklistedUser`,
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
        chats: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/Chat`,
            join: {
                from: 'users.id',
                through: {
                    from: 'chats_users.user_id',
                    to: 'chats_users.chat_id'
                },
                to: 'chats.id'
            }
        },
        reports: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'users.id',
                through: {
                    from: 'user_reports.user_id',
                    to: 'user_reports.report_id'
                },
                to: 'reports.id'
            }
        },
        posts: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Post`,
            join: {
                from: 'users.id',
                to: 'posts.created_by'
            }
        },
        schedules: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/Schedule`,
            join: {
                from: 'users.id',
                through: {
                    from: 'participants.user_id',
                    to: 'participants.schedule_id'
                },
                to: 'schedules.id'
            }
        },
    })

    $formatJson(json) {
        json = super.$formatJson(json);
        delete json.password;
        return json;
    }
}
