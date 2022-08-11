/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  await knex('productsViews').insert([
    { id: 1, views: 100, productId: 1 },
    { id: 2, views: 200, productId: 2 },
    { id: 3, views: 1000, productId: 3 },
    { id: 4, views: 1200, productId: 4 },
    { id: 5, views: 1300, productId: 5 },
    { id: 6, views: 2000, productId: 6 },
    { id: 7, views: 2100, productId: 7 },
    { id: 8, views: 2200, productId: 8 },
    { id: 9, views: 2300, productId: 9 },
    { id: 10, views: 10, productId: 10 },
    { id: 11, views: 3000, productId: 11 },
    { id: 12, views: 3014, productId: 12 },
    { id: 13, views: 4000, productId: 13 },
    { id: 14, views: 5000, productId: 14 },
    { id: 15, views: 5010, productId: 15 },
    { id: 16, views: 6000, productId: 16 },
    { id: 17, views: 7000, productId: 17 },
    { id: 18, views: 200, productId: 18 },
    { id: 19, views: 500, productId: 19 },
    { id: 20, views: 99000, productId: 20 },
    { id: 21, views: 2, productId: 21 },
    { id: 22, views: 2, productId: 22 },
    { id: 23, views: 2, productId: 23 },
    { id: 24, views: 2, productId: 24 },
    { id: 25, views: 2, productId: 25 },
    { id: 26, views: 2, productId: 26 },
    { id: 27, views: 46040, productId: 27 },
    { id: 28, views: 2, productId: 28 },
    { id: 29, views: 40, productId: 29 },
    { id: 30, views: 2, productId: 30 },
    { id: 31, views: 1, productId: 31 },
    { id: 32, views: 401460, productId: 32 }
  ])
}
