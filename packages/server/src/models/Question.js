import { BaseClass } from '../utils'

export class Question extends BaseClass {
    static get tableName () {
        return 'questions'
    }

    static relationMappings = () => ({
        subtheme: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Question`,
            join: {
                from: 'questions.subtheme_id',
                to: 'subthemes.id'
            }
        }
    })
}
