import { BaseClass } from '../utils'

export class UserReport extends BaseClass {
    static get tableName () {
        return 'users_reports'
    }

    static relationMappings = () => ({
        reason: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/ReportReason`,
            join: {
                from: 'users_reports.report_reason_id',
                to: 'report_reasons.id'
            }
        },
        user: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'reports.id',
                join: {
                    from: 'users_reports.report_reason_id',
                    to: 'report_reasons.id'
                }
            }
        },
        report: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Report`,
            join: {
                from: 'users_reports.report_id',
                to: 'reports.id'
            }
        }
    })
}
