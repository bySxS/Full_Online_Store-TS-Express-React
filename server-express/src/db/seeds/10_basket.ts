/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  await knex('basket').insert([
    { id: 1, userId: 1, status: 'Completed', fullName: 'Ivanov Sasha Ivanovich', deliveryAddress: 'отделение 1, город зп', phoneNumber: '380500000000', dateProcessing: new Date('2022-05-24T21:23'), deliveryDate: new Date('2022-05-24T10:23') },
    { id: 2, userId: 1, status: 'SelectsTheProduct', fullName: 'Ivanov Sasha Ivanovich', deliveryAddress: 'отделение 2, город зп', phoneNumber: '380500004500' },
    { id: 3, userId: 2, status: 'InProcessing', fullName: 'Ivanov Ivan Ivanovich', deliveryAddress: 'отделение 3, город зп', phoneNumber: '380500012000' },
    { id: 4, userId: 3, status: 'Completed', fullName: 'Ivanov Stas Ivanovich', deliveryAddress: 'отделение 4, город зп', phoneNumber: '38050000030', dateProcessing: new Date('2022-02-24T21:23'), deliveryDate: new Date('2022-02-24T10:23') },
    { id: 5, userId: 4, status: 'Cancelled', fullName: 'Ivanov Petya Ivanovich', deliveryAddress: 'отделение 5, город зп', phoneNumber: '380500000100', dateProcessing: new Date('2022-03-24T21:23'), deliveryDate: new Date('2022-03-24T10:23') },
    { id: 6, userId: 5, status: 'Completed', fullName: 'Ivanov Kolya Ivanovich', deliveryAddress: 'отделение 6, город зп', phoneNumber: '380500000020', dateProcessing: new Date('2022-04-24T21:23'), deliveryDate: new Date('2022-04-24T10:23') }
  ])
}
