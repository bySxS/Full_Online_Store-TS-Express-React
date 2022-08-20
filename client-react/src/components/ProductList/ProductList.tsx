import React from 'react'
import { useAppSelector } from 'hooks/useStore'
import ProductsPanelSetting from '../ProductsPanelSetting/ProductsPanelSetting'
import style from './ProductList.module.scss'
import selectProduct from 'store/product/product.selector'
import ProductItems from '../ProductItems/ProductItems'

const ProductList = () => {
  const products = useAppSelector(selectProduct.allProducts)
  const viewProducts = useAppSelector(selectProduct.viewProducts)
  return (
    <>
      <ProductsPanelSetting />
      {products.length > 0
        ? <div className={
          viewProducts === 'Row'
            ? style.productsViewRow
            : style.productsViewCol
          }>
          {products.map(product =>
            <ProductItems
              key={product.id}
              product={product}
            />
          )}
        </div>
        : <div className={'text-center pt-4'}>Нет продуктов :(</div>
      }
    </>
  )
}

export default ProductList
