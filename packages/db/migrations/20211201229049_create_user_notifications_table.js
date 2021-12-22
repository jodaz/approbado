

export async function up(knex) {
    return knex.schema.createTable('user_notifications', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.integer('notification_id').unsigned();
        table.timestamp('read_at').nullable();;
        table.foreign('notification_id').references('notifications.id').onDelete('cascade');
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('user_notifications')
}
