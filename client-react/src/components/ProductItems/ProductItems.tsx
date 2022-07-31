import React, { FC } from 'react'
import { IProduct } from 'store/myStore/myStoreProduct.interface'

interface ProductItemProps {
  product: IProduct
}

const ProductItems: FC<ProductItemProps> = ({ product }) => {
  return (
    <div>
      {product.title}
    </div>
  )
}

export default ProductItems
