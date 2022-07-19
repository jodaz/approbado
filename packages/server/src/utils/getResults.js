import {
    Question
} from '../models'

export const MIN_APROBADO = 75;

/**
 * Get results from a trivia, takes level_id and user_id
 */
export const showResult = async (subtheme_id, level_id, user_id, res) => {
    console.log(subtheme_id, level_id, user_id, res);
    try {
        const results = await Question.query()
            .where('level_id', level_id)
            .whereIn('subtheme_id', subtheme_id)
            .withGraphFetched('options')
        let rights = 0
        let total = 0

        for (var i = 0; i < results.length; i++) {
            total++
            results[i].option_right = await results[i]
                .$relatedQuery('options')
                .where('is_right', true)
                .first()

            results[i].file =  await results[i].$relatedQuery('file')

            for (var e = 0; e < results[i].options.length; e++) {
                let answer = await results[i].options[e]
                    .$relatedQuery('answers')
                    .select('answers.*', 'options.statement')
                    .join('options', 'options.id', 'answers.option_id')
                    .where('user_id', user_id)
                    .first()
                if (answer !== undefined) {
                    answer.is_right ? rights++ : null
                    results[i].answer = answer
                }
            }
        }

        const percentage = ((rights * 100) / total);

        const points = (percentage / 10).toFixed(2)

        return { results, rights, total, percentage, points }
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}
