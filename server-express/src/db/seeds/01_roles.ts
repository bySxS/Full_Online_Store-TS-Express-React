/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  // await knex('roles').del()
  await knex('roles').insert([
    { id: 1, name: 'Администратор', nameEng: 'admin' },
    { id: 2, name: 'Модератор', nameEng: 'moder' },
    { id: 3, name: 'Пользователь', nameEng: 'user' }
  ])
}
