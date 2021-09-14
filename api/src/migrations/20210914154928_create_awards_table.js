

export async function up(knex) {
  return knex.schema.createTable('awards', table => {
      table.increments('id').primary();
      table.string('icon')
      table.string('title')
      table.integer('min_points')
      table.timestamps();
  });
}


export async function down(knex) {
  return knex.schema.dropTable('awards')
}
