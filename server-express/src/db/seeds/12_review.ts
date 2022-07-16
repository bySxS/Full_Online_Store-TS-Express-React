/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  // await knex('category_news').del()
  await knex('review').insert([
    { id: 1, user_id: 3, bought: true, product_id: 1, comment: 'телефоном доволен', advantages: 'тонкий, железный', flaws: 'не заметил', rating: 5 },
    { id: 2, user_id: 4, bought: true, product_id: 1, comment: 'согласен', advantages: '', flaws: '', parent_id: 1 },
    { id: 3, user_id: 5, bought: true, product_id: 1, comment: 'я тоже', advantages: '', flaws: '', parent_id: 2 },
    { id: 4, user_id: 6, bought: false, product_id: 1, comment: 'я не согласен сименс лучше:)', advantages: '', flaws: '', parent_id: 1 },
    { id: 5, user_id: 1, bought: true, product_id: 1, comment: 'отличный телефон', advantages: 'тонкий, железный', flaws: 'не заметил', rating: 4 },
    { id: 6, user_id: 2, bought: false, product_id: 1, comment: 'лучший', advantages: 'тонкий, железный', flaws: 'не заметил', rating: 3 }
  ])
}
