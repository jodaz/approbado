import { Schedule } from '../models'
import { validateRequest, paginatedQueryResponse,getDateString,getDayWeekString } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query
    const query = Schedule.query()

    if (filter) {
        if (filter.title) {
            query.where('title', filter.title)
        }
    }
   
    return paginatedQueryResponse(query, req, res)
}

export const all = async (req, res) => {
    const { filter } = req.query
    const schedules = await Schedule.query().select('*')
    
    schedules.forEach(schedule => {
        schedule.date_string = getDateString(schedule.starts_at)
        schedule.day_week_string = getDayWeekString(schedule.starts_at,new Date(schedule.starts_at).getDate())
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
    const { id } = req.params

    if (!reqErrors) {
        const { users_ids, ...schedule } = req.body;

        const model = await Schedule.query()
            .updateAndFetchById(id, schedule)
        await model.$relatedQuery('participants').relate(users_ids)

        return res.status(201).json(model)
    }

    return res.status(201).json(model)
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Schedule.query().findById(id)

    return res.status(201).json(model)
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Schedule.query().findById(id).delete().first();

    return res.json(model);
}
