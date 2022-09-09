

export async function up(knex) {
    return knex.schema.createTable('report_reasons', table => {
        table.increments('id').primary();
        table.string('item');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('report_reasons')
}
