import React, { FC } from 'react'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import style from './ProductPrice.module.scss'

interface IProductPrice {
  product: IProduct
}

const ProductPrice: FC<IProductPrice> = ({ product }) => {
  return (
    <div className={style.price}>
      <i className="bi bi-tag-fill text-green-500"/>
      <span title={product.priceType !== 'Основная' ? product.priceType : ''} className={product.priceType !== 'Основная' ? 'text-red-600' : ''}>
            {product.price}{product.priceCurrency}
          </span>
      {product.priceType !== 'Основная' &&
        <s className={'pl-2 text-lg text-sm text-gray-600'}>
          {product.priceFirst}{product.priceFirstCurrency}
        </s>
      }
    </div>
  )
}

export default ProductPrice
