import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('profiles', table => {
        table.increments('id').primary();
        table.boolean('public_profile').defaultTo(1);
        table.boolean('show_name').defaultTo(1);
        table.string('names').nullable();
        table.string('surnames').nullable();
        table.string('username').nullable();
        table.string('summary').nullable();
        table.string('linkedin').nullable();
        table.string('twitter').nullable();
        table.timestamps();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id').onDelete('cascade');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('profiles');
}

