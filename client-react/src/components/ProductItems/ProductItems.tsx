import React, { FC } from 'react'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import { useAppSelector } from 'hooks/useStore'
import selectProduct from 'store/product/product.selector'
import style from './ProductItems.module.scss'
import ProductViewCol from './ViewCol/ProductViewCol'
import ProductViewRow from './ViewRow/ProductViewRow'

interface ProductItemProps {
  product: IProduct
}

const ProductItems: FC<ProductItemProps> = ({ product }) => {
  const viewProducts = useAppSelector(selectProduct.viewProducts)

  return (
      <div className={
        viewProducts === 'Row'
          ? style.productsViewRow
          : style.productsViewCol
      }>
    {viewProducts === 'Row'
      ? <ProductViewRow product={product} />
      : <ProductViewCol product={product} />
    }
      </div>
  )
}

export default ProductItems
