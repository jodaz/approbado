
export async function up(knex) {
    return knex.schema.createTable('references', table => {
        table.increments('id').primary();
        table.integer('file_id').unsigned();
        table.integer('explanation_id').unsigned();
        table.foreign('file_id').references('files.id').onDelete('cascade');
        table.foreign('explanation_id').references('explanations.id').onDelete('cascade');
        table.timestamps();
    });
}
  
  
export async function down(knex) {
    return knex.schema.dropTable('references')
}
