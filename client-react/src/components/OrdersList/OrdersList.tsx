import React, { FC } from 'react'
import { IBasket } from 'store/myStore/myStoreBasket.interface'
import OrdersItem from './OrdersItem/OrdersItem'
// import style from './OrdersList.module.scss'

interface IOrdersList {
  orders: IBasket[]
}

const OrdersList: FC<IOrdersList> = ({ orders }) => {
  return (
    <>
      {orders
        ? orders.map(o =>
          <OrdersItem order={o} key={o.id} />
        )
        : <div className={'text-center'}>Нет заказов!</div>
      }
    </>
  )
}

export default OrdersList
