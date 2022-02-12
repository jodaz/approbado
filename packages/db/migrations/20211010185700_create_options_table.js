

export async function up(knex) {
    return knex.schema.createTable('options', table => {
        table.increments('id').primary();
        table.string('statement', 500);
        table.boolean('is_right').defaultsTo(false);
        table.integer('question_id').unsigned();
        table.foreign('question_id').references('questions.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('options')
}
