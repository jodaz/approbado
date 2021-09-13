

export async function up(knex) {
    return knex.schema.createTable('subthemes', table => {
        table.increments('id').primary();
        table.string('title');
        table.integer('duration');
        table.integer('trivia_id').unsigned();
        table.foreign('trivia_id').references('trivias.id').onDelete('cascade');
        table.timestamps();
    });
}
  
  
export async function down(knex) {
    return knex.schema.dropTable('subthemes')
}
  