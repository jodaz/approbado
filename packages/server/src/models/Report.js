import { BaseClass } from '../utils'

export class Report extends BaseClass {
    static get tableName () {
        return 'reports'
    }

    static relationMappings = () => ({
        post: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Post`,
            join: {
                from: 'reports.post_id',
                to: 'posts.id'
            }
        },
        userReports: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/UserReport`,
            join: {
                from: 'reports.id',
                to: 'users_reports.report_id'
            }
        }
    })
}
