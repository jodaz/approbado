import {
    Trivia,
    TriviaGrupal,
    Subtheme,
    Level,
    Award,
    SubthemeFinished
} from '../models'
import {
    validateRequest,
    paginatedQueryResponse,
    sendNotification,
    showResult,
    MIN_APROBADO
} from '../utils'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = Trivia.query().select(
            Trivia.ref('*'),
            Trivia.relatedQuery('subthemes').count().as('subthemesCount'),
            Trivia.relatedQuery('files').count().as('filesCount')
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

export const indexByPlan = async (req, res) => {
    const { filter } = req.query
    const user = req.user

    try{
        const plan = await user.$relatedQuery('plan').where('active',true).first()

        const query = Trivia.query().select(
            Trivia.ref('*'),
            Trivia.relatedQuery('subthemes').count().as('subthemesCount'),
            Trivia.relatedQuery('subthemes')
                .join('subthemes_finished', 'subthemes.id', 'subthemes_finished.subtheme_id')
                .count()
                .as('subthemesFinishedCount'),
            Trivia.relatedQuery('files').count().as('filesCount')
        )
        .join('trivias_plans','trivias_plans.trivia_id','trivias.id')

        if (filter) {
            if (filter.plan_active) {
               query.where('plan_id', plan.id)
            }
            if (filter.plan_not_active) {
               query.where('plan_id', '!=', plan.id)
            }
            if (filter.name) {
                query.where('name', 'ilike', `%${filter.name}%`)
            }
            if (filter.top) {
                query.orderBy('subthemesFinishedCount', 'DESC')
            }
            if (filter.recent) {
                query.orderBy('id','DESC')
            }
        }

        return paginatedQueryResponse(query, req, res)

    } catch(error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        try {
            const model = await Trivia.query()
                .insert(req.body)
                .returning('*')

            return res.status(201).json(model)
        } catch (error) {
            console.log(error);

            return res.status(500).json(error)
        }
    }
}

export const storeGrupal = async (req, res) => {
    const reqErrors = await validateRequest(req, res);
    const { user_ids, ...rest } = req.body;
    const { names } = req.user;

    if (!reqErrors) {
        try {
            const model = await TriviaGrupal.query()
                .insert(rest)
                .returning('*')

            await model.$relatedQuery('participants').relate(user_ids)

            const subtheme = await Subtheme.query().findById(rest.subtheme_id)

            const level = await Level.query().findById(rest.level_id)

            let data_push_notification = {
                title: 'Nueva solicitud de trivia grupal',
                body: `${names} te ha envitado una trivia grupal: ${subtheme.title} - ${level.name}`,
                data: {
                    path: {
                        name: 'room',
                        params: {
                            token: rest.link
                        },
                        query: {
                            emit: true
                        }
                    }
                }
            }

            await sendNotification(data_push_notification,user_ids)

            return res.status(201).json(model)
        } catch (error) {
            console.log(error);

            return res.status(500).json(error)
        }
    }
}

export const finishTrivia = async (req, res) => {
    const { subthemes_ids, level_id, type, awards_ids } = req.body

    try {
        const { user } = req
        const subtheme = await Subtheme.query().findById(subthemes_ids)
        const results = await showResult(subthemes_ids, level_id, user.id, res)
        let response = {}

        if (type == 'Reto' && results.percentage >= MIN_APROBADO) {
            const subthemesFinishedRaw = subthemes_ids.map(id => ({
                subtheme_id: id,
                user_id: user.id,
                finished: true
            }))

            await SubthemeFinished.query().insert(subthemesFinishedRaw)

            const award = await Award.query().findById(awards_ids)

            const count_subthemes = await award.$relatedQuery('subthemes')
                .count()
                .first();

            const count_subthemes_finished = await Subtheme.query()
                .join('subthemes_finished', 'subthemes.id', 'subthemes_finished.subtheme_id')
                .where('user_id', user.id)
                .whereIn('award_id', awards_ids)
                .where('finished', true)
                .count()
                .first()

            response = (count_subthemes_finished.count == count_subthemes.count
                && results.percentage >= MIN_APROBADO)
                ? { win_award : true, award: award}
                : { win_award : false}

            if (response.win_award) {
                await user.$relatedQuery('awards').relate(award)
            }

            const user_profile = await user.$relatedQuery('profile');

            if(user_profile === undefined){
                await user.$relatedQuery('profile')
                    .insert({
                        points : parseFloat(results.points)
                    })
            } else {
                await user.$relatedQuery('profile')
                    .update({
                        points: parseFloat(user_profile.points == null ? 0 : user_profile.points)
                            + parseFloat(results.points)
                    })
            }
        }

        return res.status(200).json({ ...response, ...results, subtheme })
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    const { id } = req.params

    const { plans_ids, ...rest } = req.body

    if (!reqErrors) {
        try {
            const model = await Trivia.query()
                .updateAndFetchById(id, {
                    cover: (req.file) ? req.file.path : '',
                    is_free: rest.is_free,
                    name: rest.name,
                    category_id: rest.category_id
                })
                .returning('*')

            await model.$relatedQuery('plans').relate(plans_ids)

            return res.status(201).json(model)
        } catch (error) {
            console.log(error);

            return res.status(500).json(error)
        }
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Trivia.query()
        .select(
            Trivia.ref('*'),
            Trivia.relatedQuery('subthemes').count().as('subthemesCount'),
            Trivia.relatedQuery('files').count().as('filesCount')
        ).where('id', id)
        .withGraphFetched('plans')
        .first();

    if (model) {
        model.plans_ids = model.plans.map(item => item.id)
    }

    return res.status(201).json(model)
}

export const showGrupal = async (req, res) => {
    const { token } = req.params

    try {
        const model = await TriviaGrupal.query()
            .where('link',token)
            .withGraphFetched('subtheme')
            .withGraphFetched('participants')
            .first()

        return res.status(201).json(model)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const destroyByUsersId = async (req, res) => {
    let token = req.params.token

    try {
        const model = await TriviaGrupal.query()
            .where('link',token)
            .withGraphFetched('subtheme')
            .withGraphFetched('participants')
            .first()

        return res.json(model);
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Trivia.query()
        .findById(id)
        .delete()
        .returning('*')
        .first();

    return res.json(model);
}
