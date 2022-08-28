import React from 'react'
import { useAppSelector } from 'hooks/useStore'
import ProductsPanelSetting from '../ProductsPanelSetting/ProductsPanelSetting'
import selectProduct from 'store/product/product.selector'
import ProductItems from '../ProductItems/ProductItems'

const ProductList = () => {
  const products = useAppSelector(selectProduct.allProducts)
  return (
    <>
      <ProductsPanelSetting />
      {products.length > 0
        ? products.map(product =>
            <ProductItems
              key={product.id}
              product={product}
            />
        )
        : <div className={'text-center pt-4'}>Нет продуктов :(</div>
      }
    </>
  )
}

export default ProductList
