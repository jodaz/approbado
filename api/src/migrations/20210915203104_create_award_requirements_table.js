
export async function up(knex) {
    return knex.schema.createTable('award_requirements', table => {
        table.increments('id').primary();
        table.integer('award_id').unsigned();
        table.integer('subtheme_id').unsigned();
        table.foreign('award_id').references('awards.id').onDelete('cascade');
        table.foreign('subtheme_id').references('subthemes.id').onDelete('cascade');
        table.timestamps();
    });
}
  
  
export async function down(knex) {
    return knex.schema.dropTable('award_requirements')
}
  