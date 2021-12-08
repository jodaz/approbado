

export async function up(knex) {
    return knex.schema.createTable('messages', table => {
        table.increments('id').primary();
        table.string('message');
        table.string('file').nullable();
        table.integer('user_id').unsigned();
        table.integer('chat_id').unsigned();
        table.foreign('chat_id').references('chats.id').onDelete('cascade');
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.timestamp('read_at',true);
        table.timestamps();
    });

}


export async function down(knex) {
    return knex.schema.dropTable('messages')
}
