import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('trivia_settings', table => {
    table.increments('id').primary();
    table.boolean('grant_certification');
    table.integer('time_limit');
    table.timestamps();
  });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('trivia_settings');
}

