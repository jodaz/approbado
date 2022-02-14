import { Schedule,Participant,User,Question } from '../models'
import { validateRequest, paginatedQueryResponse,getDateString,getDayWeekString ,getTimeString,sendNotification } from '../utils'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query
    const query = Schedule.query()

    try {
        if (filter) {
            if (filter.title) {
                query.where('title', 'ilike', `%${filter.title}%`)
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

export const byUserId = async (req, res) => {
    const { user_id, } = req.params

    const { filter } = req.query

    try {
        const user = await  User.query().findById(user_id)

        let schedules = null

        if (filter) {
            if (filter.before) {
                schedules = await user.$relatedQuery('schedules')
                    .where('schedules.starts_at', '>=', new Date())
            }
            if (filter.current) {
                schedules = await user.$relatedQuery('schedules')
                    .whereRaw('extract(hour from starts_at) = '+parseInt(new Date().getHours()))
                    .where('schedules.starts_at', '<=', new Date())
            }
        } else {
            schedules = await user.$relatedQuery('schedules')
        }

        for (var i = 0; i < schedules.length; i++) {

            let participants_finished =  await schedules[i].$relatedQuery('participants')
                                                .where('participants.finished',false)
                                                .count()
                                                .first()

            schedules[i].rest = participants_finished.count

            let participants = await schedules[i].$relatedQuery('participants')
                .select(
                    'participants.finished',
                    'users.*'
                )
            if (schedules[i].finished) {
                schedules[i].winner = await getWinner(participants,schedules[i].level_id,schedules[i].subtheme_id)
            }

            schedules[i].participants = participants
        }

        schedules.forEach(schedule => {
            schedule.date_string = getDateString(schedule.starts_at)
            schedule.day_week_string = getDayWeekString(schedule.starts_at,new Date(schedule.starts_at).getDate())
            schedule.time_string = getTimeString(schedule.starts_at)
            schedule.color  = '#F6FA00'
        })

        return res.status(200).json(schedules)
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

export const new_schedules = async (req, res) => {
    const user = req.user;

    try {
        const new_schedules = await user.$relatedQuery('schedules')
            .where('schedules.starts_at','>=',new Date())
            .orWhereRaw('extract(hour from starts_at) = '+parseInt(new Date().getHours()))
            .count()
            .first()

        return res.status(200).json({ new_schedules : new_schedules.count})
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

export const get_schedules = async () => {
    const schedules = await Schedule.query()
                                    .whereRaw("cast(starts_at-now() as varchar) like '00:30%'")

    try{
        for (var i = 0; i < schedules.length; i++) {
            
            if (schedules[i].notify_before) {
                
                let participants = await schedules[i].$relatedQuery('participants').select('users.id')
                let ids = [];

                participants.forEach(participant => {
                    ids.push(participant.id)
                })
               
                let data_push_notification = {
                    title:  'Aviso de Evento',
                    body :   `Dentro de 30 minutos comenzará el evento: `+schedules[i].title,
                    data : {
                        path : {
                            name : 'details_trivia', 
                            params : { trivia_id : schedules[i].id},
                            query : {
                                ...schedules[i] ,
                                button_enable : true
                            },
                        },    
                        message :  `Dentro de 30 minutos comenzará el evento: `+schedules[i].title
                    }
                }
            }       

        await sendNotification(data_push_notification,ids)
        }
    }catch(error){
        console.log(error)
    }   
}


export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { users_ids, ...schedule } = req.body;

        try {
            const model = await Schedule.query().insert({...schedule, starts_at : new Date(schedule.starts_at).toLocaleString() })
            await model.$relatedQuery('participants').relate(users_ids)

            let participants = await model.$relatedQuery('participants')

            const io = req.app.locals.io;

            io.emit('new_schedule',{participants :participants})

            return res.status(201).json(model)
        } catch(error){
            console.log(error)
            return res.status(500).json(error)
        }
    }
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);
    const { id } = req.params

    if (!reqErrors) {
        const { users_ids, ...schedule } = req.body;

        try {
            const model = await Schedule.query()
                .updateAndFetchById(id, schedule)

            await model.$relatedQuery('participants').unrelate()

            await model.$relatedQuery('participants').relate(users_ids)

            let participants = await model.$relatedQuery('participants')

            const io = req.app.locals.io;

            io.emit('new_schedule',{participants :participants})

            return res.status(201).json(model)
        } catch(error){
            console.log(error)
            return res.status(500).json(error)
        }
    }
}

export const updateFinishedShedule = async (req, res) => {
    const { user_id, id } = req.params

    try {
        let participant = await Participant.query().where('participants.schedule_id',id)
            .where('participants.user_id', user_id)
            .update({finished : true})

        const model = await Schedule.query().findById(id)

        let participants = await model.$relatedQuery('participants')
            .count()
            .first()
        let participants_finished = await model.$relatedQuery('participants')
            .where('finished',true)
            .count()
            .first()

        if (participants.count == participants_finished.count) {
            await Schedule.query()
                .updateAndFetchById(id,{ finished : true })
        }

        const io = req.app.locals.io;

        io.emit('finished_event-'+id,{participants :participants})

        return res.status(201).json(participant)
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    try {
        const model = await Schedule.query().findById(id)

        return res.status(201).json(model)
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

export const show_participants = async (req, res) => {
    const { id } = req.params

    try {
        const model = await Schedule.query().findById(id)
        const participants = await model.$relatedQuery('participants')

        return res.status(201).json(participants)
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

export const show_participants_pending = async (req, res) => {
    const { id } = req.params

    try {
        const model = await Schedule.query().findById(id)
        const participants = await model.$relatedQuery('participants').where('finished',false)

        return res.status(201).json(participants)
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)

    try {
        const model = await Schedule.query().findById(id);
        await model.$relatedQuery('participants').unrelate()
        await Schedule.query().findById(id).delete();

        return res.json(model);
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

 const getWinner = async (participants,level_id,subtheme_id) => {
    try {
        const results = await Question.query()
            .where('subtheme_id', subtheme_id)
            .where('level_id', level_id)
            .withGraphFetched('options')

        for (var l = 0; l < participants.length; l++) {
            let rights = 0
            let total = 0

            for (var i = 0; i < results.length; i++) {
            total++
            results[i].option_right = await results[i].$relatedQuery('options')
                .where('is_right',true)
                .first()

                for (var e = 0; e < results[i].options.length; e++) {
                    let answer = await results[i].options[e]
                        .$relatedQuery('answers')
                        .select('answers.*','options.statement')
                        .join('options','options.id','answers.option_id')
                        .where('user_id',participants[l].id)
                        .first()

                    if (answer !== undefined) {
                        answer.is_right ? rights++ : null
                    }
                }
            }

            participants[l].percenteje = ((rights*100)/total);
            participants[l].points = (participants[l].percenteje/10).toFixed(2)
            participants[l].rights = rights
            participants[l].total = total
        }

        let winner = participants.sort(compare)[0]

        return winner
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

function compare(a, b) {
    if (a.points < b.points ) {
        return 1;
    }
    if (a.points > b.points) {
        return -1;
    }
    return 0;
}
