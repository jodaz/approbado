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
        },
        file: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/File`,
            join: {
                from: 'questions.file_id',
                to: 'files.id'
            }
        },
        options: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Option`,
            join: {
                from: 'questions.id',
                to: 'options.question_id'
            }
        },
        trivia: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Trivia`,
            join: {
                from: 'questions.trivia_id',
                to: 'trivias.id'
            }
        }
    })
}
