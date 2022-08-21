import React, { FC } from 'react'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import style from './ProductPrice.module.scss'

interface IProductPrice {
  product: IProduct
}

const ProductPrice: FC<IProductPrice> = ({
  product: {
    priceCurrency, priceType, price,
    priceFirst, priceFirstCurrency
  }
}) => {
  return (
    <div className={style.price}>
      <i className="bi bi-tag-fill text-green-500"/>
      <span
        title={priceType !== 'Основная' ? priceType : ''}
        className={priceType !== 'Основная' ? 'text-red-600' : ''}
      >
        {price}{priceCurrency}
      </span>
      {priceType !== 'Основная' &&
        <s className={'pl-2 text-lg text-sm text-gray-600'}>
          {priceFirst}{priceFirstCurrency}
        </s>
      }
    </div>
  )
}

export default ProductPrice
