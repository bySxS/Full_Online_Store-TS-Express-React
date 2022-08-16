import React, { FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import style from 'pages/Products/Products.module.scss'
import { useObserver } from 'hooks/useObserver'
import ProductItems from 'components/ProductItems/ProductItems'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useParams } from 'react-router-dom'
import {
  useLazyGetAllProductsByCategoryIdQuery
} from 'store/myStore/myStoreProduct.api'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import selectProduct from 'store/product/product.selector'
import ProductsPanelSetting from 'components/ProductsPanelSetting/ProductsPanelSetting'

import { IDParams } from '../ProductDetails/ProductDetails'

interface ProductProps {
  name: string
}

const ProductsCategory: FC<ProductProps> = ({ name }) => {
  const { id: idParam } = useParams<IDParams>()
  const id = +(idParam || '')
  const pagination = useRef<HTMLHeadingElement>(null)
  const products = useAppSelector(selectProduct.allProducts)
  const countProducts = useAppSelector(selectProduct.countProducts)
  const filterState = useAppSelector(selectProduct.filterState)
  const pageProduct = useAppSelector(selectProduct.pageProduct)
  const totalProduct = useAppSelector(selectProduct.totalProduct)
  const prevCategory = useAppSelector(selectProduct.prevCategory)
  const { incPageProduct, clearProducts, setPrevCategory } = useAppActions()
  const [limit] = useState(10)
  const [totalPage, setTotalPage] = useState(Math.round((totalProduct ?? limit) / limit) + 1)
  const [fetchProducts,
    { isLoading, isSuccess, isError, data, error }] =
    useLazyGetAllProductsByCategoryIdQuery()
  useInfoLoading({ isLoading, isSuccess, isError, data, error })
  const getProducts = () => {
    fetchProducts({ categoryId: id, page: pageProduct, limit, ...filterState })
    incPageProduct()
  }
  useObserver(pagination, pageProduct, totalPage, isLoading, prevCategory, getProducts)
  const { setShowCategory } = useAppActions()
  const handleClick = () => {
    setShowCategory([])
  }

  useEffect(() => {
    setTotalPage(Math.round((totalProduct ?? limit) / limit) + 1)
  }, [totalProduct])

  useEffect(() => {
    clearProducts()
    setPrevCategory(String(id))
  }, [id])

  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={name}/>
      </Helmet>
      <ProductsPanelSetting />
      продукты {countProducts}
      {products &&
        <div className={style.productsView} onClick={handleClick}>
            {products.map(product =>
            <ProductItems key={product.id} product={product} />
            )}
        </div>
      }
      <div ref={pagination}
           className={style.autoPagination}/>
      {!products && <div>Нет продуктов :(</div>}
    </>
  )
}

export default ProductsCategory
