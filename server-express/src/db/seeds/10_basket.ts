/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  // await knex('category_news').del()
  await knex('basket').insert([
    { id: 1, user_id: 1, status: 'completed', delivery_address: 'отделение 1, город зп', phone_number: '380500000000', date_processing: new Date('2022-05-24T21:23'), delivery_date: new Date('2022-05-24T10:23') },
    { id: 2, user_id: 1, status: 'Selects the product', delivery_address: 'отделение 2, город зп', phone_number: '380500004500' },
    { id: 3, user_id: 2, status: 'In processing', delivery_address: 'отделение 3, город зп', phone_number: '380500012000' },
    { id: 4, user_id: 3, status: 'completed', delivery_address: 'отделение 4, город зп', phone_number: '38050000030', date_processing: new Date('2022-02-24T21:23'), delivery_date: new Date('2022-02-24T10:23') },
    { id: 5, user_id: 4, status: 'completed', delivery_address: 'отделение 5, город зп', phone_number: '380500000100', date_processing: new Date('2022-03-24T21:23'), delivery_date: new Date('2022-03-24T10:23') },
    { id: 6, user_id: 5, status: 'completed', delivery_address: 'отделение 6, город зп', phone_number: '380500000020', date_processing: new Date('2022-04-24T21:23'), delivery_date: new Date('2022-04-24T10:23') }
  ])
}
