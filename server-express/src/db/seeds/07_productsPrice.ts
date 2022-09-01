/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  await knex('productsPrice').insert([
    { id: 1, priceTypeId: 1, productId: 1, price: '14449' },
    { id: 2, priceTypeId: 2, productId: 1, price: '10000' },
    { id: 3, priceTypeId: 3, productId: 1, price: '12449' },
    { id: 4, priceTypeId: 4, productId: 1, price: '13049' },
    { id: 5, priceTypeId: 1, productId: 2, price: '13049' },
    { id: 6, priceTypeId: 1, productId: 3, price: '13049' },
    { id: 7, priceTypeId: 1, productId: 4, price: '13049' },
    { id: 8, priceTypeId: 1, productId: 5, price: '13049' },
    { id: 9, priceTypeId: 1, productId: 6, price: '13049' },
    { id: 10, priceTypeId: 1, productId: 7, price: '13049' },
    { id: 11, priceTypeId: 1, productId: 8, price: '13049' },
    { id: 12, priceTypeId: 1, productId: 9, price: '13049' },
    { id: 13, priceTypeId: 1, productId: 10, price: '20049' },
    { id: 14, priceTypeId: 1, productId: 11, price: '21049' },
    { id: 15, priceTypeId: 1, productId: 12, price: '22049' },
    { id: 16, priceTypeId: 1, productId: 13, price: '23049' },
    { id: 17, priceTypeId: 1, productId: 14, price: '24049' },
    { id: 18, priceTypeId: 1, productId: 15, price: '25049' },
    { id: 19, priceTypeId: 1, productId: 16, price: '26049' },
    { id: 20, priceTypeId: 1, productId: 17, price: '27049' },
    { id: 21, priceTypeId: 1, productId: 18, price: '28049' },
    { id: 22, priceTypeId: 1, productId: 19, price: '29049' },
    { id: 23, priceTypeId: 1, productId: 20, price: '30049' },
    { id: 24, priceTypeId: 1, productId: 21, price: '31049' },
    { id: 25, priceTypeId: 1, productId: 22, price: '32049' },
    { id: 26, priceTypeId: 1, productId: 23, price: '33049' },
    { id: 27, priceTypeId: 1, productId: 24, price: '34049' },
    { id: 28, priceTypeId: 1, productId: 25, price: '35049' },
    { id: 29, priceTypeId: 1, productId: 26, price: '36049' },
    { id: 30, priceTypeId: 1, productId: 27, price: '37049' },
    { id: 31, priceTypeId: 1, productId: 28, price: '38049' },
    { id: 32, priceTypeId: 1, productId: 29, price: '39049' },
    { id: 33, priceTypeId: 1, productId: 30, price: '40049' },
    { id: 34, priceTypeId: 1, productId: 31, price: '41049' },
    { id: 35, priceTypeId: 1, productId: 32, price: '42049' },
    { id: 36, priceTypeId: 2, productId: 32, price: '32049' },
    { id: 37, priceTypeId: 3, productId: 32, price: '35049' }
  ])
}
