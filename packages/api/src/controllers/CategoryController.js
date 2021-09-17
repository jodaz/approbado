import Category from '../models/Category'
import { validateRequest } from '../utils'

export const index = async (req, res) => {
    const { page, perPage } = req.query

    const categories = await Category.query()
        .page(page, perPage)

    const { results: data, total } = categories;
    
    return res.json({
        data,
        total
    })
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);
    
    if (!reqErrors) {
        const { name } = req.body;
    
        const model = await Category.query().insert({
            name: name,
        })
    
        return res.status(201).json(model)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Category.query().findById(id)

    return res.status(201).json(model)
}

export const update = async (req, res) => {
    const { id } = req.params

    const model = await Category.query().updateAndFetchById(id, req.body)

    return res.status(201).json(model)
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Category.query().findById(id).delete();
    
    return res.json(model);
}
