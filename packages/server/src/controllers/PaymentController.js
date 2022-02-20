import { Payment } from '../models'
import { paginatedQueryResponse } from '../utils'
import pug from 'pug'
import path from 'path'
import pdf from 'html-pdf'

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
        const query = await Payment.query().withGraphFetched('[user,plan]')

        const compiledFunction = pug.compileFile(
            path.resolve(__dirname, '../resources/pdf/reports/memberships.pug')
        );

        const compiledContent = compiledFunction({
            records: query,
            total: '0.00',
            title: 'Reporte de pagos'
        });

        const pdfFilePath = path.resolve(__dirname, '../../public/reports/pagos.pdf');

        await pdf.create(compiledContent).toFile(pdfFilePath, async (error, res) => {
            if (error) return console.log(error)
        });

        res.download(pdfFilePath)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}
