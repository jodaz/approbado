import { BaseClass } from '../utils'

export class Subtheme extends BaseClass {
    static get tableName () {
        return 'subthemes'
    }

    static relationMappings = () => ({
        trivia: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Trivia`,
            join: {
                from: 'subthemes.trivia_id',
                to: 'trivias.id'
            }
        },
        questions: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/Question`,
            join: {
                from: 'subthemes.id',
                to: 'questions.subtheme_id'
            }
        },
        files: {
            relation: BaseClass.HasManyRelation,
            modelClass: `${__dirname}/File`,
            join: {
                from: 'subthemes.id',
                to: 'files.subtheme_id'
            }
        },
        intents: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'subthemes.id',
                through: {
                    from: 'subthemes_intents.subtheme_id',
                    to: 'subthemes_intents.user_id'
                },
                to: 'users.id'
            }
        }
    })
}
