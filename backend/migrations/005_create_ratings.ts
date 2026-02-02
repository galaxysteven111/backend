import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ratings', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('rater_id').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('rated_id').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('food_box_id').references('id').inTable('food_boxes').onDelete('CASCADE').nullable();
    table.integer('rating').notNullable(); // 1-5星
    table.text('comment').nullable();
    table.timestamps(true, true);
    
    table.index(['rater_id']);
    table.index(['rated_id']);
    table.index(['food_box_id']);
    table.unique(['rater_id', 'rated_id', 'food_box_id']); // 每個用戶對每個交易只能評價一次
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ratings');
}
