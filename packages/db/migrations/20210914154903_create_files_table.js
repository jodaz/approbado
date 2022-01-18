

export async function up(knex) {
  return knex.schema.createTable('files', table => {
      table.increments('id').primary();
      table.string('title');
      table.string('file');
      table.string('size');
      table.integer('subtheme_id').unsigned();
      table.foreign('subtheme_id').references('subthemes.id').onDelete('cascade');
      table.timestamps();
  });
}


export async function down(knex) {
  return knex.schema.dropTable('files')
}
