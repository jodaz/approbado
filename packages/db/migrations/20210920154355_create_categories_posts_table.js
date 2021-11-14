
export async function up(knex) {
    return knex.schema.createTable('categories_posts', table => {
        table.increments('id').primary();
        table.integer('post_id').unsigned();
        table.integer('category_id').unsigned();
        table.foreign('post_id').references('posts.id').onDelete('cascade');
        table.foreign('category_id').references('categories.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('categories_posts')
}
