

export async function up(knex) {
  return knex.schema.createTable('trivia_settings', table => {
    table.increments('id').primary();
    table.boolean('grant_certification').defaultsTo(false);
    table.integer('time_limit');
    table.timestamps();
  });
}


export async function down(knex) {
    return knex.schema.dropTable('trivia_settings');
}

