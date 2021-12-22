import { BaseClass } from '../utils'

export class TriviaGrupal extends BaseClass {
    static get tableName () {
        return 'trivias_grupal'
    }

    static relationMappings = () => ({
        subtheme: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Subtheme`,
            join: {
                from: 'trivias_grupal.subtheme_id',
                to: 'subthemes.id'
            }
        },
        level: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Level`,
            join: {
                from: 'trivias_grupal.level_id',
                to: 'levels.id'
            }
        },
        participants: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'trivias_grupal.id',
                through: {
                    from: 'participants.trivia_grupal_id',
                    to: 'participants.user_id',
                    extra: ['schedule_id']
                },
                to: 'users.id'
            }
        },
    })
}
