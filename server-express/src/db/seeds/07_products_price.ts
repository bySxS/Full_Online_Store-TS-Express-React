/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  // await knex('category_news').del()
  await knex('products_price').insert([
    { id: 1, price_type_id: 1, product_id: 1, price: '14449' },
    { id: 2, price_type_id: 2, product_id: 1, price: '13449' },
    { id: 3, price_type_id: 3, product_id: 1, price: '12449' },
    { id: 4, price_type_id: 4, product_id: 1, price: '13049' }
  ])
}
