import { Payment } from '../models'
import { paginatedQueryResponse } from '../utils'
import { PDF } from '../config'
import path from 'path'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = Payment.query()
            .withGraphFetched('[user,plan]')

        if (filter) {
            if (filter.global_search) {
                query.where('payment_method', 'ilike', `%${filter.global_search}%`)
            }
        }

        if (sort && order) {
            switch (sort) {
                case 'user.email':
                    break;
                case 'plan.name':
                    break;
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

export const download = async (req, res) => {
    try {
        const { from, to, payment_method } = req.query.filter;

        const query = await Payment.query().withGraphFetched('[user,plan]')
            .where('created_at', from)
            .where('created_at', to)
            .where('payment_method', payment_method)

        const pdfFilePath = path.resolve(__dirname, '../../public/reports/pagos.pdf');
        const templateFilePath = path.resolve(__dirname, '../resources/pdf/reports/memberships.pug')

        const compilerParams = {
            records: query,
            total: '0.00',
            title: 'Reporte de pagos'
        }

        await PDF(
            compilerParams,
            templateFilePath,
            pdfFilePath
        );

        return res.download(pdfFilePath)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}
