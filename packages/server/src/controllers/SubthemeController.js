import { Subtheme } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query
    const query = Subtheme.query().select(
        Subtheme.ref('*'),
        Subtheme.relatedQuery('questions').count().as('questionsCount'),
        Subtheme.relatedQuery('files').count().as('filesCount')
    )

    if (filter) {
        if (filter.title) {
            query.where('title', 'ilike', `%${filter.title}%`)
        }
        if (filter.trivia_id) {
            query.where('trivia_id', filter.trivia_id)
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const model = await Subtheme.query().insert(req.body)

        return res.status(201).json(model)
    }
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { id } = req.params
        const model = await Subtheme.query()
            .updateAndFetchById(id, req.body)

        return res.status(201).json(model)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Subtheme.query().findById(id)

    return res.status(201).json(model)
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Subtheme.query().findById(id).delete().first();

    return res.json(model);
}
