/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  await knex('review').insert([
    { id: 1, userId: 3, bought: true, productId: 1, comment: 'телефоном доволен', advantages: 'тонкий, железный', flaws: 'не заметил', rating: 5 },
    { id: 2, userId: 4, bought: true, productId: 1, comment: 'согласен', advantages: '', flaws: '', parentId: 1 },
    { id: 3, userId: 5, bought: true, productId: 1, comment: 'я тоже', advantages: '', flaws: '', parentId: 2 },
    { id: 4, userId: 6, bought: false, productId: 1, comment: 'я не согласен сименс лучше:)', advantages: '', flaws: '', parentId: 1 },
    { id: 5, userId: 1, bought: true, productId: 1, comment: 'отличный телефон', advantages: 'тонкий, железный', flaws: 'не заметил', rating: 4 },
    { id: 6, userId: 2, bought: false, productId: 1, comment: 'лучший', advantages: 'тонкий, железный', flaws: 'не заметил', rating: 3 }
  ])
}
