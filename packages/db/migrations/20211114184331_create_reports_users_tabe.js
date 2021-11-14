

export async function up(knex) {
    return knex.schema.createTable('reports_users', table => {
        table.increments('id').primary();
        table.integer('report_reason_id').unsigned();
        table.integer('reported_by').unsigned();
        table.integer('report_id').unsigned();
        table.foreign('report_id').references('id').on('reports');
        table.foreign('report_reason_id').references('id').on('report_reasons');
        table.foreign('reported_by').references('id').on('users');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('reports_users')
}
