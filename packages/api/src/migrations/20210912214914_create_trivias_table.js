

export async function up(knex) {
    return knex.schema.createTable('trivias', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('cover');
        table.boolean('is_free').defaultsTo(true)
        table.integer('level_id').unsigned();
        table.integer('category_id').unsigned();
        table.foreign('category_id').references('categories.id').onDelete('cascade');
        table.foreign('level_id').references('levels.id').onDelete('cascade');
        table.timestamps();
    });
}
  
  
export async function down(knex) {
    return knex.schema.dropTable('trivias')
}
  