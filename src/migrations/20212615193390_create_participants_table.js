
export async function up(knex) {
    return knex.schema.createTable('participants', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.boolean('finished').default(0);
        table.integer('schedule_id').unsigned();
        table.integer('trivia_grupal_id').unsigned();
        table.foreign('schedule_id').references('schedules.id').onDelete('cascade');
        table.foreign('trivia_grupal_id').references('trivias_grupal.id').onDelete('cascade');
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('participants')
}
