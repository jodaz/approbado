

export async function up(knex) {
    return knex.schema.createTable('profiles', table => {
        table.increments('id').primary();
        table.boolean('public_profile').defaultTo(1);
        table.float('points', 3, 2);
        table.boolean('show_name').defaultTo(1);
        table.boolean('show_terms_privacy').defaultTo(1);
        table.string('names').nullable();
        table.string('surnames').nullable();
        table.string('username').nullable();
        table.string('summary').nullable();
        table.string('ocupation').nullable();
        table.string('linkedin').nullable();
        table.string('twitter').nullable();
        table.boolean('general_notifications').defaultTo(1);
        table.boolean('notify_mobile_app').defaultTo(1);
        table.boolean('notify_email').defaultTo(1);
        table.boolean('notify_about_chat').defaultTo(1);
        table.boolean('notify_about_comments').defaultTo(1);
        table.timestamps();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id').onDelete('cascade');
    });
}


export async function down(knex) {
    return knex.schema.dropTable('profiles');
}

