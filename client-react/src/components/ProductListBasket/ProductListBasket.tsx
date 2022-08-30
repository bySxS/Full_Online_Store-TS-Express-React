import React, { FC } from 'react'
import ProductItemBasket, { IProductItemSmall } from './ProductItemBasket/ProductItemBasket'

interface IProductListSmall {
  productSmall: IProductItemSmall[]
  onDelete: (id: number, title: string) => void
  onChangeCount?: (productId: number, productCount: number) => void
  InBasket?: boolean
}

const ProductListBasket: FC<IProductListSmall> = ({
  productSmall,
  onDelete,
  onChangeCount,
  InBasket = false
}) => {
  return (
    <div>
      {productSmall &&
        productSmall.map(item => (
          <ProductItemBasket
            {...item}
            InBasket={InBasket}
            onDelete={onDelete}
            onChangeCount={onChangeCount}
            key={item.productId} />
        ))}
    </div>
  )
}

export default ProductListBasket
