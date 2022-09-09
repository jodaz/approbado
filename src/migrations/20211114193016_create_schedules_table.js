

export async function up(knex) {
    return knex.schema.createTable('schedules', table => {
        table.increments('id').primary();
        table.string('title');
        table.text('description');
        table.string('share_link');
        table.boolean('finished').default(0);
        table.boolean('notify_before');
        table.integer('level_id').unsigned();
        table.integer('created_by').unsigned();
        table.integer('subtheme_id').unsigned();
        table.foreign('subtheme_id').references('subthemes.id').onDelete('cascade');
        table.foreign('level_id').references('levels.id').onDelete('cascade');
        table.foreign('created_by').references('users.id').onDelete('cascade');
        table.timestamps();
        table.timestamp('starts_at',true);
    });
}


export async function down(knex) {
    return knex.schema.dropTable('schedules')
}
