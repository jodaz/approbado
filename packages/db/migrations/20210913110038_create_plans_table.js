
export async function up(knex) {
    return knex.schema.createTable('plans', table => {
        table.increments('id').primary();
        table.string('name');
        table.integer('trivias_in_teams');
        table.integer('duration');
        table.boolean('forum_access').defaultsTo(1);
        table.float('amount', 3, 2);
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('plans')
}
