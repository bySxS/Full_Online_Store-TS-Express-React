/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  await knex('basketProducts').insert([
    { id: 1, basketId: 1, productId: 1, productPriceId: 3, productCount: 2, currentPrice: 12449 },
    { id: 2, basketId: 2, productId: 1, productPriceId: 2, productCount: 2, currentPrice: 14449 },
    { id: 3, basketId: 3, productId: 1, productPriceId: 1, productCount: 1, currentPrice: 14449 },
    { id: 4, basketId: 4, productId: 1, productPriceId: 1, productCount: 1, currentPrice: 16449 },
    { id: 5, basketId: 5, productId: 1, productPriceId: 1, productCount: 3, currentPrice: 17449 },
    { id: 6, basketId: 6, productId: 1, productPriceId: 1, productCount: 2, currentPrice: 18449 }
  ])
}
