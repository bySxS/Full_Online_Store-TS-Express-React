import React, {
  FC, useEffect, useRef, useState
} from 'react'
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
  const viewProducts = useAppSelector(selectProduct.viewProducts)
  const products = useAppSelector(selectProduct.allProducts)
  const filterState = useAppSelector(selectProduct.filterState)
  const pageProduct = useAppSelector(selectProduct.pageProduct)
  const totalProduct = useAppSelector(selectProduct.totalProduct)
  // const prevCategory = useAppSelector(selectProduct.prevCategory)
  const { incPageProduct, clearProducts, setPrevCategory } = useAppActions()
  const [limit] = useState(10)
  const [totalPage, setTotalPage] = useState(Math.round((totalProduct ?? limit) / limit) + 1)
  const [fetchProductsCat, {
    isLoading: isLoadingCat,
    isSuccess: isSuccessCat,
    isError: isErrorCat,
    data: dataCat,
    error: errorCat
  }] = useLazyGetAllProductsByCategoryIdQuery()
  useInfoLoading({
    isLoading: isLoadingCat,
    isSuccess: isSuccessCat,
    isError: isErrorCat,
    data: dataCat,
    error: errorCat
  })
  const getProducts = () => {
    fetchProductsCat({ categoryId: id, page: pageProduct, limit, ...filterState })
    incPageProduct()
  }
  useObserver(pagination, pageProduct, totalPage, isLoadingCat, location.pathname, getProducts)

  useEffect(() => {
    setTotalPage(Math.round((totalProduct || limit) / limit) + 1)
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
      {products &&
        <div className={
          viewProducts === 'Row'
            ? style.productsViewRow
            : style.productsViewCol
        }>
            {products.map(product =>
            <ProductItems key={product.id} product={product} />
            )}
        </div>
      }
      <div ref={pagination}
           className={style.autoPagination}/>
      {products.length === 0 && <div>Нет продуктов :(</div>}
    </>
  )
}

export default ProductsCategory
