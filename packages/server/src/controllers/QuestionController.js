import { Question } from '../models'
import { showResultAward } from '../controllers/AwardController'
import { validateRequest, paginatedQueryResponse } from '../utils'
import Excel from 'exceljs'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = Question.query()

        if (filter) {
            if (filter.global_search) {
                query.where('description', 'ilike', `%${filter.global_search}%`)
            }
            if (filter.trivia_id) {
                query.where('trivia_id', filter.trivia_id)
            }
            if (filter.subtheme_id) {
                query.where('subtheme_id', filter.subtheme_id)
            }
            if (filter.level_id) {
                query.where('level_id', filter.level_id)
            }
            if (filter.options) {
                query
                    .withGraphFetched('options')
                    .modifyGraph('options', builder => {
                        builder.where('is_right', '=', true)
                    })
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

        return res.status(500).json({ error: error })
    }
}

export const showResult = async (req, res) => {
    const { subtheme_id, level_id, user_id } = req.params

    const results = await showResultAward(subtheme_id, level_id, user_id)

    return res.status(200).json(results)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        try {
            console.log(req.body)
            const { options, ...rest } = req.body;
            const model = await Question.query().insertGraphAndFetch({
                ...rest,
                options: options
            });

            return res.status(201).json(model)
        } catch (error) {
            console.log(error)

            return res.status(500).json({ error: error })
        }
    }
}

export const upload = async (req, res) => {
    let workbook = new Excel.Workbook();
    const { path } = req.file;
    const { subtheme_id, trivia_id } = req.body
    console.log("testing")
    try {
        await workbook.xlsx.readFile(path)
            .then(() => {
                let questions = workbook.getWorksheet('PREGUNTAS')
                let answers = workbook.getWorksheet('RESPUESTAS').getSheetValues()

                questions.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
                    if (rowNumber > 1) {
                        let questionNum = rowNumber - 1;

                        const options = answers
                            .filter(row => row[2] == questionNum)
                            .map(i => ({
                                'is_right': i[3] == 'X',
                                'statement': i[1]
                            }))

                        await Question.query().insertGraphAndFetch({
                            'description': row.values[1],
                            'explanation': row.values[2],
                            'subtheme_id': subtheme_id,
                            'trivia_id': trivia_id,
                            'level_id': row.values[3],
                            options: options
                        });
                    }
                })
            })

        return res.status(201).json({ "ok": "upload success" })
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        try {
            const { id } = req.params
            const { options, ...rest } = req.body;

            const model = await Question.query()
                .updateAndFetchById(id, rest)

            return res.status(201).json(model)
        } catch (error) {
            console.log(error)

            return res.status(500).json({ error: error })
        }
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    try {
        const model = await Question.query().findById(id)

        return res.status(201).json(model)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)

    try {
        const model = await Question.query()
            .findById(id)
            .delete()
            .first();

        return res.json(model);
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}
