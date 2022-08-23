import React, { FC } from 'react'
import { IProduct } from 'store/myStore/myStoreProduct.interface'

interface IProductDetailsDown {
  product: IProduct
}

const ProductDetailsDown: FC<IProductDetailsDown> = ({ product }) => {
  return (
    <div>
      {product.id}
    </div>
  )
}

export default ProductDetailsDown
