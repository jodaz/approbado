import { Payment } from '../models'
import { paginatedQueryResponse } from '../utils'
import pug from 'pug'
import path from 'path'
import pdf from 'html-pdf'
import fs from 'fs'

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
            console.log(sort);
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
        const query = Payment.query()

        const compiledFunction = pug.compileFile(path.resolve(__dirname, '../resources/pdf/memberships.pug'));

        const compiledContent = compiledFunction({
            name: 'Timothy'
        });

        // await pdf.create(compiledContent).toStream(async (err, stream) => {
        //     return await res.status(201).json({ data: stream.pipe(fs.createWriteStream('./foo.pdf')) });
        // });
        pdf.create(compiledContent).toFile('./businesscard.pdf', function(err, res) {
            if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }
        });
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}
