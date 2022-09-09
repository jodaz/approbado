
export async function up(knex) {
    return knex.schema.createTable('questions', table => {
        table.increments('id').primary();
        table.integer('num');
        table.string('description', 500);
        table.string('explanation', 500);
        table.boolean('explanation_type').defaultsTo(1);
        table.integer('subtheme_id').unsigned();
        table.integer('level_id').unsigned();
        table.integer('trivia_id').unsigned();
        table.integer('file_id').unsigned();
        table.foreign('level_id').references('levels.id').onDelete('cascade');
        table.foreign('subtheme_id').references('subthemes.id').onDelete('cascade');
        table.foreign('file_id').references('files.id').onDelete('cascade');
        table.foreign('trivia_id').references('trivias.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('questions')
}
