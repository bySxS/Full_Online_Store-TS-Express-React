/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  await knex('characteristicsSetValue').insert([
    { characteristicsNameId: 14, productId: 1, value: 'Yellow' },
    { characteristicsNameId: 15, productId: 1, value: '1 месяц' },

    { characteristicsNameId: 16, productId: 1, value: 'NFC' },
    { characteristicsNameId: 16, productId: 1, value: 'Wi-Fi' },

    { characteristicsNameId: 17, productId: 1, value: 'Гарантийный талон' },
    { characteristicsNameId: 17, productId: 1, value: 'Зарядное устройство' },

    { characteristicsNameId: 18, productId: 1, value: '3G' },
    { characteristicsNameId: 18, productId: 1, value: '4G (LTE)' },
    { characteristicsNameId: 18, productId: 1, value: '5G' },
    { characteristicsNameId: 18, productId: 1, value: 'GSM' },

    { characteristicsNameId: 19, productId: 1, value: '6.67' },
    { characteristicsNameId: 20, productId: 1, value: '2400 x 1080' },
    { characteristicsNameId: 21, productId: 1, value: 'AMOLED' },
    { characteristicsNameId: 22, productId: 1, value: '10' },
    { characteristicsNameId: 23, productId: 1, value: 'Стекло (Gorilla Glass 5)' },

    { characteristicsNameId: 24, productId: 1, value: '2' },
    { characteristicsNameId: 25, productId: 1, value: 'Nano-SIM' },

    { characteristicsNameId: 26, productId: 1, value: '8 ГБ' },
    { characteristicsNameId: 27, productId: 1, value: '256 ГБ' },

    { characteristicsNameId: 28, productId: 1, value: 'Android' },

    { characteristicsNameId: 29, productId: 1, value: '16 Мп' },

    { characteristicsNameId: 30, productId: 1, value: 'Qualсomm Snapdragon' },
    { characteristicsNameId: 31, productId: 1, value: 'Kryo 660' },
    { characteristicsNameId: 32, productId: 1, value: 'Qualcomm Adreno 619' },
    { characteristicsNameId: 33, productId: 1, value: '8' },
    { characteristicsNameId: 34, productId: 1, value: '2.2 ГГц' },

    { characteristicsNameId: 35, productId: 1, value: '108 Мп + 8 Мп + 2 Мп' },
    { characteristicsNameId: 36, productId: 1, value: 'Вспышка' },
    { characteristicsNameId: 37, productId: 1, value: 'Full HD / 1920х1080 / стереозвук' },

    { characteristicsNameId: 38, productId: 1, value: '5000 мА*ч' },

    { characteristicsNameId: 39, productId: 1, value: 'Type-C' },
    { characteristicsNameId: 40, productId: 1, value: 'Type-C' },
    { characteristicsNameId: 41, productId: 1, value: '3.5 мм' },

    { characteristicsNameId: 42, productId: 1, value: 'GPS' },
    { characteristicsNameId: 43, productId: 1, value: 'Есть' },

    { characteristicsNameId: 44, productId: 1, value: '205' },
    { characteristicsNameId: 45, productId: 1, value: '76.1 мм' },
    { characteristicsNameId: 46, productId: 1, value: '164.2 мм' },
    { characteristicsNameId: 47, productId: 1, value: '8.1 мм' }
  ])
}
