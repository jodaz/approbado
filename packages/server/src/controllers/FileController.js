import { File } from '../models'
import { validateRequest, paginatedQueryResponse, formatBytes } from '../utils'
import isEmpty from 'is-empty'

export const index = async (req, res) => {
    const { filter } = req.query

    try {
        const query = File.query()

        if (filter) {
            if (filter.global_search) {
                query.where('title', 'ilike', `%${filter.global_search}%`)
            }
            if (filter.trivia_id) {
                query.select('files.*')
                    .join('subthemes', 'files.subtheme_id', 'subthemes.id')
                    .join('trivias', 'subthemes.trivia_id', 'trivias.id')
                    .where('trivias.id', filter.trivia_id)
            }
            if (filter.subtheme_id) {
                query.where('files.subtheme_id', filter.subtheme_id)
            }
        }

        return paginatedQueryResponse(query, req, res)
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        try {
            const { trivia_id, ...rest } = req.body
            let data = rest;

            if (!isEmpty(req.file)) {
                data.file = req.file.path;
                data.size = formatBytes(req.file.size)
            }

            const model = await File.query()
                .insert(data)

            return res.status(201).json(model)
        } catch(error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        try {
            const { id } = req.params
            const { trivia_id, ...rest } = req.body

            let data = rest;

            if (!isEmpty(req.file)) {
                data.file = req.file.path;
                data.size = formatBytes(req.file.size)
            }

            const model = await File.query()
                .updateAndFetchById(id, data)

            return res.status(201).json(model)
        } catch(error){
            console.log(error)
            return res.status(500).json(error)
        }
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    try {
        const model = await File.query().findById(id)

        return res.status(201).json(model)
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)

    try {
        const model = await File.query()
            .findById(id)
            .delete()
            .first();

        return res.json(model);
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}
