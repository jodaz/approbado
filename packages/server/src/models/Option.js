import { BaseClass } from '../utils'

export class Option extends BaseClass {
    static get tableName () {
        return 'options'
    }

    static relationMappings = () => ({
        question: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Question`,
            join: {
                from: 'options.question_id',
                to: 'options.id'
            }
        },
        answers: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Answer`,
            join: {
                from: 'options.id',
                to: 'answers.option_id'
            }
        },
    })
}
