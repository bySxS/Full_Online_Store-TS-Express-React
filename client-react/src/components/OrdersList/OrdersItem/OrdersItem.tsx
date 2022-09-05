import React, { FC, useState } from 'react'
import {
  IBasket,
  IBasketProductOut,
  TBasketStatusRus
} from 'store/myStore/myStoreBasket.interface'
import { addHostServerToFileLink } from 'utils'
import style from './OrdersItem.module.scss'

interface IOrdersItem {
  order: IBasket
}

const OrdersItem: FC<IOrdersItem> = ({
  order
}) => {
  const [products] = useState<IBasketProductOut[]>(order.BasketProducts.map(i => ({
    ...i,
    productScreen: addHostServerToFileLink(i.productScreen, i.productId, 'products_pic')
  })))
  const [price] = useState<number>(products.reduce((prev, i) => prev + i.currentPrice * i.productCount, 0))
  const [status] = useState<TBasketStatusRus>(
    order.status === 'SelectsTheProduct'
      ? 'Выбор продуктов'
      : order.status === 'InProcessing'
        ? 'В обработке'
        : order.status === 'InDelivery'
          ? 'Товар в доставке'
          : order.status === 'Completed'
            ? 'Выполнен'
            : order.status === 'Cancelled'
              ? 'Отменён'
              : 'Выбор продуктов')
  return (
    <div className={style.block}>
      <div className={style.id}>
        {order.id}
      </div>
      <div className={style.info}>
        <div className={style.status}>
          <span>
           Статус:
          </span>
          <span className={style.statusName}>
            {status}
          </span>
        </div>
        {order.comment &&
        <div className={style.comment}>
          <span>
            Комментарий:
          </span>
          <span className={style.commentText}>
            {order.comment}
          </span>
        </div>}
      </div>
      {products &&
        <div className={style.productsOverflow}>
        <div className={style.products}>
        {products.map(product =>
          <div
            key={product.id}
            className={style.blockImage}
          >
            <div className={style.count}>
              {product.productCount}
            </div>
          <img
            alt={product.productTitle}
            title={product.productTitle}
            src={product.productScreen}
            loading={'lazy'}
            className={style.image}
          />
          </div>
        )}
      </div>
      </div>}
      <div className={style.price}>
        <span className={style.priceName}>
          Цена:
        </span>
        <span className={style.priceColor}>
          {price}₴
        </span>
      </div>
    </div>
  )
}

export default OrdersItem
