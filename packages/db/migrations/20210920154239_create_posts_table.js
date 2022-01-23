

export async function up(knex) {
    return knex.schema.createTable('posts', table => {
        table.increments('id').primary();
        table.string('message');
        table.string('summary').nullable();
        table.integer('trivia_id').unsigned().nullable();
        table.string('type');
        table.integer('created_by').unsigned();
        table.foreign('created_by').references('users.id').onDelete('cascade');
        table.foreign('trivia_id').references('trivias.id').onDelete('cascade');
        table.integer('parent_id').unsigned().nullable();
        table.foreign('parent_id').references('posts.id').onDelete('cascade');
        table.timestamps();
        table.timestamp('deleted_at');
    });
}


export async function down(knex) {
    return knex.schema.dropTable('posts')
}
