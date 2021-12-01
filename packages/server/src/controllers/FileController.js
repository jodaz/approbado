import { File, Subtheme } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query
    const query = File.query()

    if (filter) {
        if (filter.title) {
            query.where('title', filter.title)
        }
        if (filter.trivia_id) {
            query.select('files.*')
                .join('subthemes', 'files.subtheme_id', 'subthemes.id')
                .join('trivias', 'subthemes.trivia_id', 'trivias.id')
                .where('trivias.id', filter.trivia_id)
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { trivia_id, ...rest } = req.body
        let data = rest;

        if (req.file) {
            data.file = req.file.path;
        }

        const model = await File.query().insert(data)

        return res.status(201).json(model)
    }
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);
    let data = req.body;

    if (!reqErrors) {
        const { id } = req.params
        const model = await File.query()
            .updateAndFetchById(id, req.body)

        return res.status(201).json(model)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await File.query().findById(id)

    return res.status(201).json(model)
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await File.query().findById(id).delete().first();

    return res.json(model);
}
