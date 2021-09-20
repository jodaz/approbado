
export async function up(knex) {
    return knex.schema.createTable('trivias_plans', table => {
        table.increments('id').primary();
        table.integer('trivia_id').unsigned();
        table.integer('plan_id').unsigned();
        table.foreign('trivia_id').references('trivias.id').onDelete('cascade');
        table.foreign('plan_id').references('plans.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('trivias_plans')
}
