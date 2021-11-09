import { BaseClass } from '../utils'

export class ReportReason extends BaseClass {
    static get tableName () {
        return 'report_reasons'
    }

    static relationMappings = () => ({
        reports: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Report`,
            join: {
                from: 'report_reasons.id',
                to: 'reports.report_reason_id'
            }
        }
    })
}
