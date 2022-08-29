import React, { FC } from 'react'
import ProductItemSmall, { IProductItemSmall } from './ProductItemSmall/ProductItemSmall'

interface IProductListSmall {
  productSmall: IProductItemSmall[]
  onDelete: (id: number, title: string) => void
  onChangeCount?: (productId: number, productCount: number) => void
  InBasket?: boolean
}

const ProductListSmall: FC<IProductListSmall> = ({
  productSmall,
  onDelete,
  onChangeCount,
  InBasket = false
}) => {
  return (
    <div>
      {productSmall &&
        productSmall.map(item => (
          <ProductItemSmall
            {...item}
            InBasket={InBasket}
            onDelete={onDelete}
            onChangeCount={onChangeCount}
            key={item.productId} />
        ))}
    </div>
  )
}

export default ProductListSmall
