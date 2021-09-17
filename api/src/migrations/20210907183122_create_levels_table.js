

export async function up(knex) {
  return knex.schema.createTable('levels', table => {
    table.increments('id').primary();
    table.string('name');
    table.timestamps();
  });
}


export async function down(knex) {
  return knex.schema.dropTable('levels');
}

