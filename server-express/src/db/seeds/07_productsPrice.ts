/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  await knex('productsPrice').insert([
    { id: 1, priceTypeId: 1, productId: 1, price: '14449' },
    { id: 2, priceTypeId: 2, productId: 1, price: '13449' },
    { id: 3, priceTypeId: 3, productId: 1, price: '12449' },
    { id: 4, priceTypeId: 4, productId: 1, price: '13049' }
  ])
}
