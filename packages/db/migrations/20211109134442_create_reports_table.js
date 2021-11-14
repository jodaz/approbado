

export async function up(knex) {
    return knex.schema.createTable('reports', table => {
        table.increments('id').primary();
        table.string('num');
        table.integer('report_reason_id').unsigned();
        table.integer('reported_by').unsigned();
        table.integer('post_id').unsigned();
        table.foreign('post_id').references('id').on('posts');
        table.foreign('report_reason_id').references('id').on('report_reasons');
        table.foreign('reported_by').references('id').on('users');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('reports')
}
