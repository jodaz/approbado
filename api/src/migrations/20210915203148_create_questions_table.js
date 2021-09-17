
export async function up(knex) {
    return knex.schema.createTable('questions', table => {
        table.increments('id').primary();
        table.string('description');
        table.boolean('is_question').defaultsTo(true);
        table.integer('subtheme_id').unsigned();
        table.integer('trivia_id').unsigned();
        table.foreign('subtheme_id').references('subthemes.id').onDelete('cascade');
        table.foreign('trivia_id').references('trivias.id').onDelete('cascade');
        table.timestamps();
    });
}
  
  
export async function down(knex) {
    return knex.schema.dropTable('questions')
}
