

export async function up(knex) {
    return knex.schema.createTable('chats_users', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.integer('chat_id').unsigned();
        table.enum('status',['accepted','rejected','pending']).defaultsTo('pending');
        table.foreign('chat_id').references('chats.id').onDelete('cascade');
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('chats_users')
}
