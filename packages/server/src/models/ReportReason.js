import { BaseClass } from '../utils'

export class ReportReason extends BaseClass {
    static get tableName () {
        return 'report_reasons'
    }

    static relationMappings = () => ({
        userReports: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/UserReport`,
            join: {
                from: 'report_reasons.id',
                to: 'users_reports.report_reason_id'
            }
        }
    })
}
