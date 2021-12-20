import { Award, Subtheme, Answer, Question, User } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter , subtheme } = req.query
    const query = Award.query()

    if (filter) {
        if (filter.title) {
            query.where('title', 'ilike', `%${filter.title}%`)
        }
    }
    
    return paginatedQueryResponse(query, req, res)
}

export const indexAwardSubtheme = async (req, res) => {
    const { trivia_id } = req.params
    const { id: currUserId } = req.user;

    const award_subthemes = await Award.query()
                                   .where('trivia_id', `${trivia_id}`)
                                   .withGraphFetched('subthemes')
                                   .orderBy('min_points','ASC')

    for (var i = 0; i < award_subthemes.length; i++) {
        for (var e = 0; e < award_subthemes[i].subthemes.length; e++) {
            
            let finished = await award_subthemes[i].subthemes[e]
                                                   .$relatedQuery('finished')
                                                   .where('user_id',currUserId)
                                                   .count()
                                                   .first();
                                                   
            award_subthemes[i].subthemes[e].finished = finished.count == 0 ? false : true; 
        }
    }
    
    return res.status(200).json(award_subthemes)
}

export const verifyAward = async (req, res) => {
    
    const { user_id, subtheme_id,level_id, award_id, type } = req.body
    
    const subtheme = await Subtheme.query().findById(subtheme_id)

    const results = await showResult(subtheme_id, level_id, user_id)
    
    if (type == 'Reto') {
        await subtheme.$relatedQuery('intents').relate({user_id, finished : results.win })  
    }else{
        await subtheme.$relatedQuery('intents').relate({user_id, finished : false })  
    }
    
    const award = await Award.query().findById(award_id)

    const count_subthemes = await award.$relatedQuery('subthemes').count().first();
    
    const count_subthemes_finished = await subtheme.$relatedQuery('intents')
                                                    .join('subthemes','subthemes.id','subthemes_intents.subtheme_id')
                                                    .where('user_id',user_id)
                                                    .where('award_id',award_id)
                                                    .where('finished',true)
                                                    .count()
                                                    .first()

    const response = (count_subthemes_finished.count == count_subthemes.count && results.win) ? {win_award : true, award :award} : {win_award : false}                                     
    
    const points = ((subtheme.points/results.total)*results.rights).toFixed(0)
    
    const user = await User.query().findById(user_id)
    
    const user_profile = await user.$relatedQuery('profile');

    if (type == 'Reto') {
        if(user_profile === undefined){
            await user.$relatedQuery('profile').insert({points : points })
        }else{
            await user.$relatedQuery('profile').update({points : user_profile.points+points})
        } 
    }
    
    return res.status(200).json({...response,...results,subtheme})
}

export const showResult = async (subtheme_id, level_id, user_id) => {
    
    const results = await Question.query()
                          .where('subtheme_id', subtheme_id)
                          .where('level_id', level_id)
                          .withGraphFetched('options')
    let rights = 0
    let total = 0

    for (var i = 0; i < results.length; i++) {
        total++
        results[i].option_right = await results[i].$relatedQuery('options').where('is_right',true).first()

        for (var e = 0; e < results[i].options.length; e++) {
            
            let answer = await results[i].options[e]
                                           .$relatedQuery('answers')
                                           .select('answers.*','options.statement')
                                           .join('options','options.id','answers.option_id')
                                           .where('user_id',user_id)
                                           .first()
            if (answer !== undefined) {
                answer.is_right ? rights++ : null
                results[i].answer = answer 
            }
        }
    }

    let win = ((rights*100)/total) >= 50 ? true : false;

    return {results,rights:rights,total:total,win:win}
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const model = await Award.query().insert(req.body)

        return res.status(201).json(model)
    }
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { id } = req.params
        const model = await Award.query()
            .updateAndFetchById(id, req.body)

        return res.status(201).json(model)
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Award.query().findById(id)

    return res.status(201).json(model)
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Award.query().findById(id).delete().first();

    return res.json(model);
}
