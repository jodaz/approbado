

export async function up(knex) {
    return knex.schema.createTable('answers', table => {
        table.increments('id').primary();
        table.boolean('is_right').defaultsTo(1);
        table.integer('user_id').unsigned();
        table.integer('option_id').unsigned();
        table.foreign('option_id').references('options.id').onDelete('cascade');
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('answers')
}
