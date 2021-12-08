

export async function up(knex) {
    return knex.schema.createTable('notifications', table => {
        table.increments('id').primary();
        table.string('data');
        table.text('long_data');
        table.string('type');
        table.integer('created_by').unsigned();
        table.integer('chat_id').unsigned();
        table.integer('post_id').unsigned();
        table.integer('membership_id').unsigned();
        table.foreign('created_by').references('users.id').onDelete('cascade');
        table.foreign('chat_id').references('chats.id').onDelete('cascade');
        table.foreign('post_id').references('posts.id').onDelete('cascade');
        table.foreign('membership_id').references('memberships.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('notifications')
}