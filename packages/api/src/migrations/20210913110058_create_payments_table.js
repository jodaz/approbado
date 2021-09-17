

export async function up(knex) {
    return knex.schema.createTable('payments', table => {
        table.increments('id').primary();
        table.integer('type')
        table.boolean('membership_status').defaultsTo(1)
        table.decimal('amount', 3, 2);
        table.integer('plan_id').unsigned();
        table.integer('users_id').unsigned();
        table.foreign('users_id').references('users.id').onDelete('cascade');
        table.foreign('plan_id').references('plans.id').onDelete('cascade');
        table.timestamp('member_to').nullable()
        table.timestamps();
    });
}
  
  
export async function down(knex) {
    return knex.schema.dropTable('payments')
}
  