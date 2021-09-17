

export async function up(knex) {
    return knex.schema.createTable('explanation_types', table => {
        table.increments('id').primary();
        table.string('type')
        table.timestamps();
    });
  }
  
  
  export async function down(knex) {
    return knex.schema.dropTable('explanation_types')
  }
  