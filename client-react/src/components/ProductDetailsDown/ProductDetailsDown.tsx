import React, { FC } from 'react'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import style from './ProductDetailsDown.module.scss'

interface IProductDetailsDown {
  product: IProduct
}

const ProductDetailsDown: FC<IProductDetailsDown> = ({ product }) => {
  return (
    <div className={style.secondContainer}>
      {product.id}
    </div>
  )
}

export default ProductDetailsDown
