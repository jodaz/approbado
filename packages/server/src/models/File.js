import { BaseClass } from '../utils'

export class File extends BaseClass {
    static get tableName () {
        return 'files'
    }

    static relationMappings = () => ({
        questions: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Subtheme`,
            join: {
                from: 'files.id',
                to: 'questions.file_id'
            }
        },
        subtheme: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Subtheme`,
            join: {
                from: 'files.subtheme_id',
                to: 'subthemes.id'
            }
        },
        trivia: {
            relation: BaseClass.HasOneThroughRelation,
            modelClass: `${__dirname}/Trivia`,
            join: {
                from: 'files.subtheme_id',
                through: {
                    from: 'subthemes.id',
                    to: 'subthemes.trivia_id'
                },
                to: 'trivias.id'
            }
        }
    })
}
