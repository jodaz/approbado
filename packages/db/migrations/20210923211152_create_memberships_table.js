

export async function up(knex) {
    return knex.schema.createTable('memberships', table => {
        table.increments('id').primary();
        table.boolean('active');
        table.integer('plan_id').unsigned();
        table.integer('user_id').unsigned();
        table.integer('payment_id').unsigned();
        table.foreign('payment_id').references('payments.id').onDelete('cascade');
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.foreign('plan_id').references('plans.id').onDelete('cascade');
        table.timestamps();
    });
}


export async function down(knex) {
    return knex.schema.dropTable('memberships')
}
