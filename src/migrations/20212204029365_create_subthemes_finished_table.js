

export async function up(knex) {
    return knex.schema.createTable('subthemes_finished', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.integer('subtheme_id').unsigned();
        table.boolean('finished').default(0);
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.foreign('subtheme_id').references('subthemes.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('subthemes_finished')
}
