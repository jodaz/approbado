import { Plan } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = Plan.query().select(
            Plan.ref('*'),
            Plan.relatedQuery('trivias').count().as('triviasCount')
        )

        if (filter) {
            if (filter.name) {
                query.where('name', 'ilike', `%${filter.name}%`)
            }
        }

        if (sort && order) {
            switch (sort) {
                default:
                    query.orderBy(sort, order);
                    break;
            }
        }

        return paginatedQueryResponse(query, req, res)
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        try {
            const { trivia_ids, ...plan } = req.body;

            const model = await Plan.query().insert(plan)
            await model.$relatedQuery('trivias').relate(trivia_ids)

            return res.status(201).json(model)
        } catch (error) {
            console.log(error)

            return res.status(500).json(error)
        }
    }
}

export const update = async (req, res) => {
    const { id } = req.params

    try {
        const model = await Plan.query()
            .updateAndFetchById(id, req.body)

        return res.status(201).json(model)
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    try {
        const model = await Plan.query().findById(id)

        return res.status(201).json(model)
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)

    try {
        const model = await Plan.query()
            .findById(id)
            .delete()
            .first();

        return res.json(model);
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}
