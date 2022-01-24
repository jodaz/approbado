//@ts-nocheck
import { ReportReason } from '@approbado/server/dist/models'

export async function seed(knex) {
    const reasons = [
        'No me interesa este tipo de publicaciones',
        'No es académico',
        'Expresa intenciones de discriminación'
    ];

    // Deletes ALL existing entries
    return knex('report_reasons').del()
        .then(async function () {
            const data = await reasons.map(item => ({ item: item }))

            await ReportReason.query().insert(data)
        });
};
