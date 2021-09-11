import { Knex } from "knex";


export async function up(knex) {
  return knex.schema.createTable('notification_settings', table => {
    table.increments('id').primary();
    table.boolean('general_notifications');
    table.boolean('account_updates');
    table.boolean('chat');
    table.boolean('on_mobile');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id').onDelete('cascade');
    table.timestamps();
  });
}


export async function down(knex) {
    return knex.schema.dropTable('notification_settings')
}

