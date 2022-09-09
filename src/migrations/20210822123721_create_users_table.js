
export async function up(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('names');
        table.string('last_name');
        table.string('user_name');
        table.text('bio');
        table.string('picture').defaultsTo('public/default/user.png')
        table.string('email').unique();
        table.string('password');
        table.string('rol');
        table.boolean('is_registered').defaultsTo(1)
        table.string('phone').nullable();
        table.timestamps();
        table.timestamp('verified_at').nullable();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('users');
}

