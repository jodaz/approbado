import { Trivia } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query
    const query = Trivia.query()

    if (filter) {
        if (filter.name) {
            query.where('name', filter.name)
        }
    }

    return paginatedQueryResponse(query, req, res)
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

    let data = req.body;

    if (req.file) {
        data.cover = req.file.path;
    }

    const model = await Trivia.query()
        .updateAndFetchById(id, data)

    return res.status(201).json(model)
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Trivia.query().findById(id)

    return res.status(201).json(model)
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Trivia.query().findById(id).delete().first();

    return res.json(model);
}
