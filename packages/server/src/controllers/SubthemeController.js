import { Subtheme } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = Subtheme.query().select(
            Subtheme.ref('*'),
            Subtheme.relatedQuery('questions').count().as('questionsCount'),
            Subtheme.relatedQuery('files').count().as('filesCount')
        )

        if (filter) {
            if (filter.name) {
                query.where('name', 'ilike', `%${filter.name}%`)
            }
            if (filter.trivia_id) {
                query.where('trivia_id', filter.trivia_id)
            }
            if (filter.award_id) {
                query.where('award_id', filter.award_id)
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
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        try {
            const model = await Subtheme.query().insert(req.body)

            return res.status(201).json(model)
        } catch(error){
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
            const model = await Subtheme.query()
                .updateAndFetchById(id, req.body)

            return res.status(201).json(model)
        } catch(error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    try {
        const model = await Subtheme.query().findById(id)

        return res.status(201).json(model)
    } catch(error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const showRandom = async (req, res) => {
    const user = req.user

    try {
        const plan = await user.$relatedQuery('plan')
            .where('active', true)
            .first()

        const model = await Subtheme.query()
            .join('trivias_plans','trivias_plans.trivia_id','subthemes.trivia_id')
            .where('plan_id', plan.id)
            .orderByRaw('random()')
            .first();

        await model.$fetchGraph('trivia')

        return res.status(200).json(model)
    } catch(error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)

    try {
        const model = await Subtheme.query()
            .findById(id)
            .delete()
            .first();

        return res.json(model);
    } catch(error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
