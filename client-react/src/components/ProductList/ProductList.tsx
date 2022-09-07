import React, { FC } from 'react'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import { useAppSelector } from 'hooks/useStore'
import selectProduct from 'store/product/product.selector'
import style from './ProductList.module.scss'
import ProductsPanelSetting from '../ProductsPanelSetting/ProductsPanelSetting'
import ProductItems from '../ProductItems/ProductItems'

interface IProductList {
  products: IProduct[]
}

const ProductList: FC<IProductList> = ({ products }) => {
  const viewProducts = useAppSelector(selectProduct.viewProducts)
  return (
    <>
      <ProductsPanelSetting />
      <div className={
        viewProducts === 'Row'
          ? style.productsViewRow
          : style.productsViewCol
      }>
      {products.length > 0
        ? products.map(product =>
            <ProductItems
              key={product.id}
              product={product}
            />
        )
        : <div className={'text-center pt-4'}>Нет продуктов :(</div>
      }
      </div>
    </>
  )
}

export default ProductList
