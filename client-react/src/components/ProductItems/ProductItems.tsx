import React, { FC } from 'react'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import { useAppSelector } from 'hooks/useStore'
import selectProduct from 'store/product/product.selector'
import ProductViewCol from './ViewCol/ProductViewCol'
import ProductViewRow from './ViewRow/ProductViewRow'

interface ProductItemProps {
  product: IProduct
}

const ProductItems: FC<ProductItemProps> = ({ product }) => {
  const viewProducts = useAppSelector(selectProduct.viewProducts)

  return (
    <>
    {viewProducts === 'Row'
      ? <ProductViewRow product={product} />
      : <ProductViewCol product={product} />
    }
    </>
  )
}

export default ProductItems
