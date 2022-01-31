import { BaseClass } from '../utils'

export class Profile extends BaseClass {
    static get tableName () {
        return 'profiles'
    }

    static modifiers = {
        orderByPoints(query, order) {
            query
                .where('points', '>', 0)
                .orderBy('points', order)
        }
    };

    static relationMappings = () => ({
        owner: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'profiles.user_id',
                to: 'users.id'
            }
        }
    })
}
