

export async function up(knex) {
  return knex.schema.createTable('password_resets', table => {
    table.increments('id').primary();
    table.string('token');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id').onDelete('cascade');
    table.timestamps();
  });
}


export async function down(knex) {
    return knex.schema.dropTable('password_resets')
}

