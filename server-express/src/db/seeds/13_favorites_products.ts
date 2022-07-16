/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  // await knex('category_news').del()
  await knex('favorites_products').insert([
    { id: 1, user_id: 1, product_id: 1 },
    { id: 2, user_id: 2, product_id: 1 },
    { id: 3, user_id: 3, product_id: 1 },
    { id: 4, user_id: 4, product_id: 1 },
    { id: 5, user_id: 5, product_id: 1 },
    { id: 6, user_id: 6, product_id: 1 }
  ])
}
