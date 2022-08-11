/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  await knex('characteristicsSetValue').insert([
    { characteristicsNameId: 14, productId: 1, characteristicsValueId: 1 },
    { characteristicsNameId: 15, productId: 1, characteristicsValueId: 2 },
    { characteristicsNameId: 16, productId: 1, characteristicsValueId: 3 },
    { characteristicsNameId: 16, productId: 1, characteristicsValueId: 4 },
    { characteristicsNameId: 17, productId: 1, characteristicsValueId: 5 },
    { characteristicsNameId: 17, productId: 1, characteristicsValueId: 6 },
    { characteristicsNameId: 18, productId: 1, characteristicsValueId: 7 },
    { characteristicsNameId: 18, productId: 1, characteristicsValueId: 8 },
    { characteristicsNameId: 18, productId: 1, characteristicsValueId: 9 },
    { characteristicsNameId: 18, productId: 1, characteristicsValueId: 10 },
    { characteristicsNameId: 19, productId: 1, characteristicsValueId: 11 },
    { characteristicsNameId: 20, productId: 1, characteristicsValueId: 12 },
    { characteristicsNameId: 21, productId: 1, characteristicsValueId: 13 },
    { characteristicsNameId: 22, productId: 1, characteristicsValueId: 14 },
    { characteristicsNameId: 23, productId: 1, characteristicsValueId: 15 },
    { characteristicsNameId: 24, productId: 1, characteristicsValueId: 16 },
    { characteristicsNameId: 25, productId: 1, characteristicsValueId: 17 },
    { characteristicsNameId: 26, productId: 1, characteristicsValueId: 18 },
    { characteristicsNameId: 27, productId: 1, characteristicsValueId: 19 },
    { characteristicsNameId: 28, productId: 1, characteristicsValueId: 20 },
    { characteristicsNameId: 29, productId: 1, characteristicsValueId: 21 },
    { characteristicsNameId: 30, productId: 1, characteristicsValueId: 22 },
    { characteristicsNameId: 31, productId: 1, characteristicsValueId: 23 },
    { characteristicsNameId: 32, productId: 1, characteristicsValueId: 24 },
    { characteristicsNameId: 33, productId: 1, characteristicsValueId: 25 },
    { characteristicsNameId: 34, productId: 1, characteristicsValueId: 26 },
    { characteristicsNameId: 35, productId: 1, characteristicsValueId: 27 },
    { characteristicsNameId: 36, productId: 1, characteristicsValueId: 28 },
    { characteristicsNameId: 37, productId: 1, characteristicsValueId: 29 },
    { characteristicsNameId: 38, productId: 1, characteristicsValueId: 30 },
    { characteristicsNameId: 39, productId: 1, characteristicsValueId: 31 },
    { characteristicsNameId: 40, productId: 1, characteristicsValueId: 31 },
    { characteristicsNameId: 41, productId: 1, characteristicsValueId: 33 },
    { characteristicsNameId: 42, productId: 1, characteristicsValueId: 34 },
    { characteristicsNameId: 43, productId: 1, characteristicsValueId: 35 },
    { characteristicsNameId: 44, productId: 1, characteristicsValueId: 36 },
    { characteristicsNameId: 45, productId: 1, characteristicsValueId: 37 },
    { characteristicsNameId: 46, productId: 1, characteristicsValueId: 38 },
    { characteristicsNameId: 47, productId: 1, characteristicsValueId: 39 }
  ])
}
