import { BaseClass } from '../utils'

export class SubthemeFinished extends BaseClass {
    static get tableName () {
        return 'subthemes_finished'
    }

    static relationMappings = () => ({
        user: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'subthemes_finished.user_id',
                to: 'users.id'
            }
        },
        subtheme: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Subtheme`,
            join: {
                from: 'subthemes_finished.subtheme_id',
                to: 'subthemes.id'
            }
        }
    })
}
