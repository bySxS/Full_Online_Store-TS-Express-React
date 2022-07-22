/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  // await knex('category_news').del()
  await knex('characteristics_set_value').insert([
    { characteristics_name_id: 14, product_id: 1, value: 'Yellow' },
    { characteristics_name_id: 15, product_id: 1, value: '1 месяц' },

    { characteristics_name_id: 16, product_id: 1, value: 'NFC' },
    { characteristics_name_id: 16, product_id: 1, value: 'Wi-Fi' },

    { characteristics_name_id: 17, product_id: 1, value: 'Гарантийный талон' },
    { characteristics_name_id: 17, product_id: 1, value: 'Зарядное устройство' },

    { characteristics_name_id: 18, product_id: 1, value: '3G' },
    { characteristics_name_id: 18, product_id: 1, value: '4G (LTE)' },
    { characteristics_name_id: 18, product_id: 1, value: '5G' },
    { characteristics_name_id: 18, product_id: 1, value: 'GSM' },

    { characteristics_name_id: 19, product_id: 1, value: '6.67' },
    { characteristics_name_id: 20, product_id: 1, value: '2400 x 1080' },
    { characteristics_name_id: 21, product_id: 1, value: 'AMOLED' },
    { characteristics_name_id: 22, product_id: 1, value: '10' },
    { characteristics_name_id: 23, product_id: 1, value: 'Стекло (Gorilla Glass 5)' },

    { characteristics_name_id: 24, product_id: 1, value: '2' },
    { characteristics_name_id: 25, product_id: 1, value: 'Nano-SIM' },

    { characteristics_name_id: 26, product_id: 1, value: '8 ГБ' },
    { characteristics_name_id: 27, product_id: 1, value: '256 ГБ' },

    { characteristics_name_id: 28, product_id: 1, value: 'Android' },

    { characteristics_name_id: 29, product_id: 1, value: '16 Мп' },

    { characteristics_name_id: 30, product_id: 1, value: 'Qualсomm Snapdragon' },
    { characteristics_name_id: 31, product_id: 1, value: 'Kryo 660' },
    { characteristics_name_id: 32, product_id: 1, value: 'Qualcomm Adreno 619' },
    { characteristics_name_id: 33, product_id: 1, value: '8' },
    { characteristics_name_id: 34, product_id: 1, value: '2.2 ГГц' },

    { characteristics_name_id: 35, product_id: 1, value: '108 Мп + 8 Мп + 2 Мп' },
    { characteristics_name_id: 36, product_id: 1, value: 'Вспышка' },
    { characteristics_name_id: 37, product_id: 1, value: 'Full HD / 1920х1080 / стереозвук' },

    { characteristics_name_id: 38, product_id: 1, value: '5000 мА*ч' },

    { characteristics_name_id: 39, product_id: 1, value: 'Type-C' },
    { characteristics_name_id: 40, product_id: 1, value: 'Type-C' },
    { characteristics_name_id: 41, product_id: 1, value: '3.5 мм' },

    { characteristics_name_id: 42, product_id: 1, value: 'GPS' },
    { characteristics_name_id: 43, product_id: 1, value: 'Есть' },

    { characteristics_name_id: 44, product_id: 1, value: '205' },
    { characteristics_name_id: 45, product_id: 1, value: '76.1 мм' },
    { characteristics_name_id: 46, product_id: 1, value: '164.2 мм' },
    { characteristics_name_id: 47, product_id: 1, value: '8.1 мм' }
  ])
}
