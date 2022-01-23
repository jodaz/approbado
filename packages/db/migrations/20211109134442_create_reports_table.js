

export async function up(knex) {
    return knex.schema.createTable('reports', table => {
        table.increments('id').primary();
        table.string('num');
        table.integer('post_id').unsigned();
        table.foreign('post_id').references('id').on('posts');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('reports')
}
