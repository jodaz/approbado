import { Trivia, TriviaGrupal, Subtheme, Level, Question, Plan } from '../models'
import { validateRequest, paginatedQueryResponse,sendNotification } from '../utils'

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

    const { plans, ...rest } = req.body

    if (!reqErrors) {
        try {
            const model = await Trivia.query().insert(rest)

            await model.$relatedQuery('plans').relate(plans)

            return res.status(201).json(model)
        } catch (error) {
            console.log(error);

            return res.status(500).json(error)
        }
    }
}

export const storeGrupal = async (req, res) => {
    const reqErrors = await validateRequest(req, res);
    const {user_ids , ...rest } = req.body;
    const { names } = req.user;

    if (!reqErrors) {
        try {
            const model = await TriviaGrupal.query().insert(rest)

            await model.$relatedQuery('participants').relate(user_ids)

            const subtheme = await Subtheme.query().findById(rest.subtheme_id)

            const level = await Level.query().findById(rest.level_id)

            let data_push_notification = {
                title :  'Nueva solicitud de trivia grupal',
                body :   `${names} te ha envitado una trivia grupal: ${subtheme.title} - ${level.name}`,
                data : {
                    path : {
                        name : 'room',
                        params : {
                            token : rest.link
                        },
                        query : {
                            emit : true
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

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    const { id } = req.params

    const { plans_ids, ...rest } = req

    if (!reqErrors) {
        try {
            const model = await Trivia.query()
                .updateAndFetchById(id, {
                    cover: (req.file) ? req.file.path : '',
                    is_free: rest.is_free,
                    name: rest.name,
                    category_id: rest.category_id
                })

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

    return res.status(201).json(model)
}

export const showGrupal = async (req, res) => {
    const { token } = req.params

    const model = await TriviaGrupal.query()
                                    .where('link',token)
                                    .withGraphFetched('subtheme')
                                    .withGraphFetched('participants')
                                    .first()

    return res.status(201).json(model)
}

export const destroyByUsersId = async (req, res) => {
    let token = req.params.token

    const model = await TriviaGrupal.query()
                                    .where('link',token)
                                    .withGraphFetched('subtheme')
                                    .withGraphFetched('participants')
                                    .first()

    const results = await Question.query()
                          .where('subtheme_id', subtheme_id)
                          .where('level_id', level_id)
                          .withGraphFetched('options')

    //const model = await Answer.query().where('user_id',`${user_id}`).delete();

    return res.json(model);
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Trivia.query().findById(id).delete().first();

    return res.json(model);
}
