import { Schedule,User } from '../models'
import { validateRequest, paginatedQueryResponse,getDateString,getDayWeekString ,getTimeString } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query
    const query = Schedule.query()

    if (filter) {
        if (filter.title) {
            query.where('title', 'ilike', `%${filter.title}%`)
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const byUserId = async (req, res) => {
    const { user_id } = req.params

    const user = await  User.query().findById(user_id)

    const schedules = await user.$relatedQuery('schedules')

    schedules.forEach(schedule => {
        schedule.date_string = getDateString(schedule.starts_at)
        schedule.day_week_string = getDayWeekString(schedule.starts_at,new Date(schedule.starts_at).getDate())
        schedule.time_string = getTimeString(schedule.starts_at)
        schedule.color  = '#F6FA00'
    })

    return res.status(200).json(schedules)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { users_ids, ...schedule } = req.body;

        const model = await Schedule.query().insert(schedule)
        await model.$relatedQuery('participants').relate(users_ids)

        return res.status(201).json(model)
    }
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);
    const { id } = req.params

    if (!reqErrors) {
        const { users_ids, ...schedule } = req.body;

        const model = await Schedule.query()
                            .updateAndFetchById(id, schedule)

        await model.$relatedQuery('participants').unrelate()

        await model.$relatedQuery('participants').relate(users_ids)

        return res.status(201).json(model)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Schedule.query().findById(id)

    return res.status(201).json(model)
}

export const show_participants = async (req, res) => {
    const { id } = req.params

    const model = await Schedule.query().findById(id)
    const participants = await model.$relatedQuery('participants')

    return res.status(201).json(participants)
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)

    const model = await Schedule.query().findById(id);
    await model.$relatedQuery('participants').unrelate()
    await Schedule.query().findById(id).delete();
    
    return res.json(model);
}
