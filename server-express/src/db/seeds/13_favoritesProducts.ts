/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  await knex('favoritesProducts').insert([
    { id: 1, userId: 1, productId: 1 },
    { id: 2, userId: 2, productId: 1 },
    { id: 3, userId: 3, productId: 1 },
    { id: 4, userId: 4, productId: 1 },
    { id: 5, userId: 5, productId: 1 },
    { id: 6, userId: 6, productId: 1 }
  ])
}
