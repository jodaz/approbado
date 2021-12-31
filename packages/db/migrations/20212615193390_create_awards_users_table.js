
export async function up(knex) {
    return knex.schema.createTable('awards_users', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.integer('award_id').unsigned();
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.foreign('award_id').references('awards.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('awards_users')
}
