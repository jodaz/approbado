import { BaseClass } from '../utils'

export class LikePost extends BaseClass {
    static get tableName () {
        return 'like_posts'
    }

    /*static relationMappings = () => ({
        post: {
            relation: BaseClass.BelongsToOneRelation,
            modelClass: `${__dirname}/Post`,
            join: {
                from: 'like_posts.post_id',
                to: 'posts.id'
            }
        }
    })*/
}
