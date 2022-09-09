

export async function up(knex) {
    return knex.schema.createTable('payments', table => {
        table.increments('id').primary();
        table.string('payment_method');
        table.decimal('amount', 3, 2);
        table.integer('plan_id').unsigned();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.foreign('plan_id').references('plans.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('payments')
}
