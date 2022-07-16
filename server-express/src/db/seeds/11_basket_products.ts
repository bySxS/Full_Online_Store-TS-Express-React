/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  // await knex('category_news').del()
  await knex('basket_products').insert([
    { id: 1, basket_id: 1, product_id: 1, product_price_id: 3, product_count: 2, current_price: 12449 },
    { id: 2, basket_id: 2, product_id: 1, product_price_id: 2, product_count: 2, current_price: 14449 },
    { id: 3, basket_id: 3, product_id: 1, product_price_id: 1, product_count: 1, current_price: 14449 },
    { id: 4, basket_id: 4, product_id: 1, product_price_id: 1, product_count: 1, current_price: 16449 },
    { id: 5, basket_id: 5, product_id: 1, product_price_id: 1, product_count: 3, current_price: 17449 },
    { id: 6, basket_id: 6, product_id: 1, product_price_id: 1, product_count: 2, current_price: 18449 }
  ])
}
