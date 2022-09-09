

export async function up(knex) {
  return knex.schema.createTable('awards', table => {
      table.increments('id').primary();
      table.string('file')
      table.string('icon_winner')
      table.string('title')
      table.integer('min_points')
      table.string('type');
      table.integer('trivia_id').unsigned();
      table.foreign('trivia_id').references('trivias.id').onDelete('cascade');
      table.timestamps();
  });
}


export async function down(knex) {
  return knex.schema.dropTable('awards')
}
