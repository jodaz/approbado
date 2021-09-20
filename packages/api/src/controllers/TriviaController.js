import Trivia from '../models/Trivia'
import { validateRequest } from '../utils'

export const index = async (req, res) => {
    const { page, perPage, filter } = req.query

    const query = Trivia.query()

    if (filter) {
        query.where('title', filter.title)
    }
    
    const users = await query.page(page, perPage)
    const { total, results: data } = users;
    
    return res.json({
        data,
        total
    })
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const model = await Trivia.query().insert(req.body)
    
        return res.status(201).json(model)
    }
}

export const update = async (req, res) => {
    const { id } = req.params

    const model = await Trivia.query().updateAndFetchById(id, req.body)

    return res.status(201).json(model)
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Trivia.query().findById(id,)

    return res.status(201).json(model)
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Trivia.query().findById(id).delete().first();
    
    return res.json(model);
}
