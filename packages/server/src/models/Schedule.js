import { BaseClass } from '../utils'

export class Schedule extends BaseClass {
    static get tableName () {
        return 'schedules'
    }

    static relationMappings = () => ({
        level: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Level`,
            join: {
                from: 'schedules.level_id',
                to: 'levels.id'
            }
        },
        subtheme: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Subtheme`,
            join: {
                from: 'schedules.subtheme_id',
                to: 'subthemes.id'
            }
        },
        participants: {
            relation: BaseClass.ManyToManyRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'schedules.id',
                through: {
                    from: 'participants.schedule_id',
                    to: 'participants.user_id'
                },
                to: 'users.id',
                extra: ['finished']
            }
        },
    })

     $formatJson(json) {
        json = super.$formatJson(json);
        return json;
    }
}
