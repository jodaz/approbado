import { BaseClass } from '../utils'

export class Report extends BaseClass {
    static get tableName () {
        return 'reports'
    }

    static relationMappings = () => ({
        reason: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/ReportReason`,
            join: {
                from: 'reports.report_reason_id',
                to: 'report_reasons.id'
            }
        },
        reportedBy: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'reports.reported_by',
                to: 'users.id'
            }
        }
    })
}
