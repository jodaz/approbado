import { Question,Subtheme } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter, options} = req.query
    const query = Question.query()

    if (filter) {
        if (filter.title) {
            query.where('title', 'ilike', `%${filter.title}%`)
        }
        if (filter.trivia_id) {
            query.where('trivia_id', filter.trivia_id)
        }
        if (filter.subtheme_id) {
            query.where('subtheme_id', filter.subtheme_id)
        }
        if (filter.level_id) {
            query.where('level_id', filter.level_id)
        }
    }

    if (options) {
        query.withGraphFetched('options')
    }

    return paginatedQueryResponse(query, req, res)
}

export const showResult = async (req, res) => {
    const { subtheme_id, level_id, user_id } = req.params
    
    const results = await Question.query()
                          .where('subtheme_id', subtheme_id)
                          .where('level_id', level_id)
                          .withGraphFetched('options')

    const subtheme = await Subtheme.query().findById(subtheme_id)

    let rights = 0
    let total = 0

    for (var i = 0; i < results.length; i++) {
        total++
        results[i].option_right = await results[i].$relatedQuery('options').where('is_right',true).first()

        for (var e = 0; e < results[i].options.length; e++) {
            
            let answer = await results[i].options[e]
                                           .$relatedQuery('answers')
                                           .select('answers.*','options.statement')
                                           .join('options','options.id','answers.option_id')
                                           .where('user_id',user_id)
                                           .first()
            if (answer !== undefined) {
                answer.is_right ? rights++ : null
                results[i].answer = answer 
            }
        }
    }

    let points = ((subtheme.points/total)*rights).toFixed(0)

    let win = ((rights*100)/total) >= 50 ? true : false;

    return res.status(200).json({results,rights:rights,total:total,win:win,points:points})
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { options, ...rest } = req.body;
        const model = await Question.query().insertGraphAndFetch({
            ...rest,
            options: options
        });

        return res.status(201).json(model)
    }
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { id } = req.params
        const { options, ...rest } = req.body;

        const model = await Question.query()
            .updateAndFetchById(id, rest)

        return res.status(201).json(model)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Question.query().findById(id)

    return res.status(201).json(model)
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Question.query().findById(id).delete().first();

    return res.json(model);
}
