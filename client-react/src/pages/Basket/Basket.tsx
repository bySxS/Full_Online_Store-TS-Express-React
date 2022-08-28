import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import ProductListSmall from 'components/ProductListSmall/ProductListSmall'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useGetBasketQuery } from 'store/myStore/myStoreBasket.api'

interface BasketProps {
  name: string
}

const Basket: FC<BasketProps> = ({ name }) => {
  const {
    isLoading, isSuccess, isError, data, error
  } = useGetBasketQuery('')
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
  return (
    <div>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <ProductListSmall productSmall={} />
    </div>
  )
}

export default Basket
