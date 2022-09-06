import React, { FC, useEffect } from 'react'
import { IBasket } from 'store/myStore/myStoreBasket.interface'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import OrdersItem from './OrdersItem/OrdersItem'
// import style from './OrdersList.module.scss'

interface IOrdersList {
  orders: IBasket[]
  inAdmin?: boolean
}

const OrdersList: FC<IOrdersList> = ({
  orders,
  inAdmin
}) => {
  const { setBreadcrumb } = useBreadcrumb()
  useEffect(() => {
    setBreadcrumb({})
  }, [])
  return (
    <>
      {orders
        ? orders.map(o =>
          <OrdersItem order={o} key={o.id} inAdmin={inAdmin} />
        )
        : <div className={'text-center'}>Нет заказов!</div>
      }
    </>
  )
}

export default OrdersList
