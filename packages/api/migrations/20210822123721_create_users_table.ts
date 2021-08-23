import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('names');
        table.string('email').unique();
        table.string('password');
        table.string('rol');
        table.string('phone').nullable();
        table.timestamps();
        table.timestamp('verified_at').nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

