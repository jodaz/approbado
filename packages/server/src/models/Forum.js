import { BaseClass } from '../utils'

export class Forum extends BaseClass {
    static get tableName () {
        return 'forums'
    }

    static relationMappings = () => ({
        owner: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'forums.created_by',
                to: 'users.id'
            }
        }
    })
}
