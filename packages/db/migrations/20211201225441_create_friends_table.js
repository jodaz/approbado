

export async function up(knex) {
    return knex.schema.createTable('friends', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.integer('friend_id').unsigned();
        table.foreign('friend_id').references('users.id').onDelete('cascade');
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('friends')
}
