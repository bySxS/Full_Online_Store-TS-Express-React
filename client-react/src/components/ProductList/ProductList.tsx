import React, { FC } from 'react'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import ProductsPanelSetting from '../ProductsPanelSetting/ProductsPanelSetting'
import ProductItems from '../ProductItems/ProductItems'

interface IProductList {
  products: IProduct[]
}

const ProductList: FC<IProductList> = ({ products }) => {
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
