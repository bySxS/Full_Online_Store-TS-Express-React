import React, { FC } from 'react'
import ProductItemSmall, { IProductItemSmall } from './ProductItemSmall/ProductItemSmall'

interface IProductListSmall {
 productSmall: IProductItemSmall[]
}

const ProductListSmall: FC<IProductListSmall> = ({
  productSmall
}) => {
  return (
    <div>
      {productSmall &&
        productSmall.map(item => (
          <ProductItemSmall {...item} key={item.productId} />
        ))}
    </div>
  )
}

export default ProductListSmall
