

export async function up(knex) {
    return knex.schema.createTable('users_reports', table => {
        table.increments('id').primary();
        table.integer('report_reason_id').unsigned();
        table.integer('user_id').unsigned();
        table.integer('report_id').unsigned();
        table.foreign('report_id').references('id').on('reports').onDelete('cascade');
        table.foreign('report_reason_id').references('id').on('report_reasons').onDelete('cascade');
        table.foreign('user_id').references('id').on('users').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('users_reports')
}
