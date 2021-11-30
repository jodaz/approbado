import { Post,LikePost } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const model = await LikePost.query().insert(req.body)

        return res.status(201).json(model)
    }
}

export const byPostId = async (req, res) => {
    const { post_id } = req.params

    const post = await  Post.query().findById(post_id)

    const likes = await post.$relatedQuery('likes')

    return res.status(200).json(likes)
}

export const destroy = async (req, res) => {
    let post_id = parseInt(req.params.post_id)
    let user_id = parseInt(req.params.user_id)

    const model = await LikePost.query()
                                .where('post_id',post_id)
                                .where('user_id',user_id)
                                .delete();

    return res.json(model);
}
