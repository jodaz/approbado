import { Report } from '../models'

/**
 * Return a padded number
 */
export const getReportNumber = async () => {
    let number = '00000001';

    const total = await Report.query().resultSize()

    if (total) {
        const record = await Report.query()
            .orderBy('num', 'DESC')
            .limit(1)
            .first();

        number = parseInt(record.num, 10) + 1
        number = ('00000000' + number.toString()).slice(-8);
    }

    return number;
}
