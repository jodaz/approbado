
export async function up(knex) {
    return knex.schema.createTable('explanations', table => {
        table.increments('id').primary();
        table.string('description');
        table.boolean('is_right').defaultsTo(true);
        table.integer('question_id').unsigned();
        table.integer('explanation_type_id').unsigned();
        table.foreign('question_id').references('questions.id').onDelete('cascade');
        table.foreign('explanation_type_id').references('explanation_types.id').onDelete('cascade');
        table.timestamps();
    });
}
  
  
export async function down(knex) {
    return knex.schema.dropTable('explanations')
}
