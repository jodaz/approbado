import { Report, Post, UserReport } from '../models'
import { validateRequest, paginatedQueryResponse, getReportNumber } from '../utils'
import isEmpty from 'is-empty'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = Report.query().select(
            Report.ref('*'),
            Report.relatedQuery('userReports').count().as('reportsCount')
        )
        .withGraphFetched('post.owner')

        if (filter) {
            if (filter.num) {
                query.where('num', 'ilike', `%${filter.num}%`)
            }
            if (filter.type) {
                query.where('type', 'ilike', `%${filter.type}%`)
            }
            if (filter.reported_user_id) {
                query.join('posts', 'posts.id', 'reports.post_id')
                    .where('posts.created_by', filter.reported_user_id)
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

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        try {
            const { user } = req;
            const { post_id, reason_id } = req.body;

            // Si el post ya tiene un reporte, crea
            // un nuevo reporte de usuario
            // Si no, crear un reporte con un reporte de usuario
            const post = await Post.query()
                .where('id', post_id)
                .withGraphFetched('report')
                .first()

            if (!isEmpty(post.report)) {
                await UserReport.query().insert({
                    report_id: post.report.id,
                    user_id: user.id
                })

                return res.status(201).json(post.report)
            } else {
                const number = await getReportNumber()

                const report = await Report.query().insertGraph({
                    num: number,
                    post_id: post_id,
                    userReports: {
                        user_id: user.id,
                        report_reason_id: reason_id
                    }
                })

                return res.status(201).json(report)
            }
        } catch (error) {
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
            const model = await Report.query()
                .findById(id)
                .withGraphFetched('[userReports,post.owner]')

            return res.status(201).json(model)
        } catch (error) {
            console.log(error)

            return res.status(500).json(error)
        }
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    try {
        const model = await Report.query()
            .findById(id)
            .withGraphFetched('[userReports,post.owner.blacklisted]')

        return res.status(201).json(model)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)

    try {
        await UserReport.query().where('report_id', id).delete();
        const model = await Report.query().findById(id).delete().first();

        return res.json(model);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
