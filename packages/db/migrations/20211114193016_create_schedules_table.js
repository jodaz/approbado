

export async function up(knex) {
    return knex.schema.createTable('schedules', table => {
        table.increments('id').primary();
        table.string('title');
        table.string('share_link');
        table.integer('level_id').unsigned();
        table.integer('subtheme_id').unsigned();
        table.foreign('subtheme_id').references('subthemes.id').onDelete('cascade');
        table.foreign('level_id').references('levels.id').onDelete('cascade');
        table.timestamps();
        table.timestamp('starts_at');
    });
}


export async function down(knex) {
    return knex.schema.dropTable('schedules')
}
