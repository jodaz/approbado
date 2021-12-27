import { Answer, Question } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query

    const query = Answer.query()

    if (filter) {
        if (filter.name) {
            query.where('name', 'ilike', `%${filter.name}%`)
        }
        if (filter.user_id) {
            query.where('user_id',`${user_id}`)
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {

        const model = await Answer.query().insert(req.body)

        return res.status(201).json(model)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Answer.query().findById(id)

    return res.status(201).json(model)
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { id } = req.params

        const model = await Answer.query().updateAndFetchById(id, req.body)

        return res.status(201).json(model)
    }
}

export const destroyByUserId = async (req, res) => {
    let user_id = parseInt(req.params.user_id)
    let subtheme_id = parseInt(req.params.subtheme_id)
    let level_id = parseInt(req.params.level_id)
    
    const question = await Question.query()
                          .where('subtheme_id', subtheme_id)
                          .where('level_id', level_id)
                          .withGraphFetched('options')
 

    for (var i = 0; i < question.length; i++) {
 
        for (var e = 0; e < question[i].options.length; e++) {
            
            let answer = await question[i].options[e]
                                         .$relatedQuery('answers')
                                         .select('answers.*','options.statement')
                                         .join('options','options.id','answers.option_id')
                                         .where('user_id',user_id)
                                         .first()
           if (answer !== undefined) {
                await Answer.query().findById(answer.id).delete();
            }
            
        }
    }

    return res.json({response : 'OK'});
}



export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Answer.query().findById(id).delete();

    return res.json(model);
}
