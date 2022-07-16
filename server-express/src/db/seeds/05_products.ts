/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  // await knex('category_news').del()
  await knex('products').insert([
    {
      id: 1,
      title: 'Смартфон Xiaomi Poco X4 pro 5g 8/256Gb Poco Yellow (Global Version) Seller Refurbished',
      category_id: 8,
      user_id: 1,
      description: 'Увага! Стан товару — Refurbished. Refurbished — відновлений товар. Часто товар повертається виробнику з різних причин: повернення від покупця, передпродажні пошкодження товару чи пакування, списання залежалих залишків, пошкодження при транспортуванні. Після повернення такої товар тестують, ремонтують, оновлюють до заводських налаштувань, відповідно до вимог виробника. Даний товар зберігався на вітрині магазину та не був у використанні. Всі комплектуючи та безпосередньо телефон, мають заводські плівки, які не знімались. Заводська коробка відкрита. Диагональ экрана:6.67" / Разрешение дисплея:2400x1080 / Тип матрицы:AMOLED / Процессор:Qualcomm Snapdragon 695 5G / Количество ядер:8 / Частота процессора:2.2 ГГц / Количество СИМ-карт:2 SIM / Количество мегапикселей фронтальной камеры:16 Мп f/2.5 / Количество мегапикселей основной камеры:108 Мп + 8 Мп + 2 Мп / Оперативная память:8 ГБ / Встроенная память:256 ГБ / Операционная система:Android 11 / Вес, г:205 г /',
      count: 10,
      availability: true,
      screen: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image5: '',
      image6: '',
      image7: '',
      image8: '',
      image9: '',
      image10: '',
      video_youtube_url: '',
      parent_id: null,
      url: 'Xiaomi_Poco_X4_pro_5g_8_256Gb_Poco_Yellow'
    }
  ])
}
