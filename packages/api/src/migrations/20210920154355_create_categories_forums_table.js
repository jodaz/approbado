
export async function up(knex) {
    return knex.schema.createTable('categories_forums', table => {
        table.increments('id').primary();
        table.integer('forum_id').unsigned();
        table.integer('category_id').unsigned();
        table.foreign('forum_id').references('forums.id').onDelete('cascade');
        table.foreign('category_id').references('categories.id').onDelete('cascade');
        table.timestamps();
    });
}
  
  
export async function down(knex) {
    return knex.schema.dropTable('categories_forums')
}
