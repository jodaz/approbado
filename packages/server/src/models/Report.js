import { BaseClass } from '../utils'

export class Report extends BaseClass {
    static get tableName () {
        return 'reports'
    }

    static relationMappings = () => ({
        reason: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Post`,
            join: {
                from: 'reports.post_id',
                to: 'posts.id'
            }
        },
        reportedBy: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'reports.id',
                through: {
                    from: 'user_reports.report_id',
                    to: 'user_reports.user_id'
                },
                to: 'users.id'
            }
        }
    })
}
