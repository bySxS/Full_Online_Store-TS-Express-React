/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  await knex('productsPriceType').insert([
    { id: 1, name: 'Основная' },
    { id: 2, name: 'Акционная' },
    { id: 3, name: 'Новогодняя' },
    { id: 4, name: '11 ноября' }
  ])
}
