import { Fcm } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);
    const { user_id , token } = req.body
    
    if (!reqErrors) {

      const validate = await Fcm.query()
                           .where('user_id',user_id)
                           .where('token',token)
                           .count()
                           .first()

      if (validate.count == 0) await Fcm.query().insert(req.body)

      return res.status(201).json({data: 'OK'})
    }
}

export const destroy = async (req, res) => {
    let user_id = parseInt(req.params.user_id)
    let token = parseInt(req.params.token)
    
    const model = await Fcm.query()
                           .where('user_id',user_id)
                           .where('token',token)
                           .delete();

    return res.json(model);
}
