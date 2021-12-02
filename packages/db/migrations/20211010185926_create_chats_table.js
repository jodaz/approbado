

export async function up(knex) {
    return knex.schema.createTable('chats', table => {
        table.increments('id').primary();
        table.string('name').nullable();
        table.boolean('is_private').defaultsTo(1);
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('chats')
}
