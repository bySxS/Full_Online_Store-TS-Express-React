import React, { FC } from 'react'
import { IBasket } from 'store/myStore/myStoreBasket.interface'

interface IOrdersItem {
  order: IBasket
}

const OrdersItem: FC<IOrdersItem> = ({
  order
}) => {
  return (
    <div>
    
    </div>
  )
}

export default OrdersItem
