

export async function up(knex) {
    return knex.schema.createTable('trivias', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('cover');
        table.boolean('is_free').defaultsTo(true)
        table.boolean('grant_certification').defaultsTo(true);
        table.integer('category_id').unsigned();
        table.foreign('category_id').references('categories.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('trivias')
}
