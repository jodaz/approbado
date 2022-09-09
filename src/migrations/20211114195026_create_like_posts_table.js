
export async function up(knex) {
    return knex.schema.createTable('like_posts', table => {
        table.increments('id').primary();
        table.integer('post_id').unsigned();
        table.integer('user_id').unsigned();
        table.foreign('post_id').references('posts.id').onDelete('cascade');
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('like_posts')
}
