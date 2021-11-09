

export async function up(knex) {
    return knex.schema.createTable('comments', table => {
        table.increments('id').primary();
        table.string('message');
        table.integer('user_id').unsigned();
        table.integer('forum_id').unsigned();
        table.foreign('forum_id').references('forums.id').onDelete('cascade');
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.timestamps();
        table.timestamp('deleted_at').nullable();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('comments')
}
