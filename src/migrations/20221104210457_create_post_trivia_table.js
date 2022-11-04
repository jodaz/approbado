
export async function up(knex) {
    return knex.schema.createTable('post_trivia', table => {
        table.increments('id').primary();
        table.integer('post_id').unsigned();
        table.integer('trivia_id').unsigned();
        table.foreign('trivia_id').references('trivias.id').onDelete('cascade');
        table.foreign('post_id').references('posts.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('post_trivia')
}
