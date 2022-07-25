/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  await knex('productsViews').insert([
    { id: 1, views: 2, productId: 1 }
  ])
}
