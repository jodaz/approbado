

export async function up(knex) {
    return knex.schema.createTable('trivias_grupal', table => {
        table.increments('id').primary();
        table.text('link');
        table.string('type');
        table.integer('level_id').unsigned();
        table.integer('subtheme_id').unsigned();
        table.foreign('subtheme_id').references('subthemes.id').onDelete('cascade');
        table.foreign('level_id').references('levels.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('trivias_grupal')
}
