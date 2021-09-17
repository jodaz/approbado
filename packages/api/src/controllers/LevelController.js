import Level from '../models/Level'
import { validateRequest } from '../utils'

export const index = async (req, res) => {
    const { page, perPage } = req.query

    const levels = await Level.query()
        .page(page, perPage)

    const { results: data, total } = levels;
    
    return res.json({
        data,
        total
    })
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);
    
    if (!reqErrors) {
        const { name } = req.body;
    
        const model = await Level.query().insert({
            name: name,
        })
    
        return res.status(201).json(model)
    }
}

export const update = async (req, res) => {
    const { id } = req.params

    const model = await Level.query().updateAndFetchById(id, req.body)

    return res.status(201).json(model)
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Level.query().findById(id).delete().returning('*');
    
    return res.json(model);
}
