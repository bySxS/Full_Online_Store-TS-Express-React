import React, { FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useLocation, useParams } from 'react-router-dom'
import {
  useLazyAllProductsQuery,
  useLazyGetAllProductsByCategoryIdQuery
} from 'store/myStore/myStoreProduct.api'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import selectProduct from 'store/product/product.selector'
import ProductList from 'components/ProductList/ProductList'
import style from './Products.module.scss'
import { useObserver } from 'hooks/useObserver'
import { IDParams } from '../ProductDetails/ProductDetails'

interface ProductProps {
  name: string
}

const Products: FC<ProductProps> = ({ name }) => {
  const pagination = useRef<HTMLHeadingElement>(null)
  const location = useLocation()
  const { id: idParam } = useParams<IDParams>()
  const id = +(idParam || '')
  const filterState = useAppSelector(selectProduct.filterState)
  const pageProduct = useAppSelector(selectProduct.pageProduct)
  const totalProduct = useAppSelector(selectProduct.totalProduct)
  const {
    incPageProduct, clearProducts
  } = useAppActions()
  const [limit] = useState(10)
  const [prevPageLoad, setPrevPageLoad] = useState(location.pathname)
  const [totalPage, setTotalPage] = useState(Math.round((totalProduct || limit) / limit) + 1)

  const [fetchProducts, {
    isLoading, isSuccess, isError, data, error
  }] = useLazyAllProductsQuery()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })

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
    if (location.pathname !== '/products' && id > 0) {
      fetchProductsCat({ categoryId: id, page: pageProduct, limit, ...filterState })
    } else {
      fetchProducts({ page: pageProduct, limit, ...filterState })
    }
    incPageProduct()
  }

  useObserver(pagination,
    pageProduct,
    totalPage,
    (location.pathname !== '/products' && id > 0)
      ? isLoadingCat
      : isLoading,
    prevPageLoad,
    getProducts)

  useEffect(() => {
    setTotalPage(Math.round((totalProduct || limit) / limit) + 1)
  }, [totalProduct])

  useEffect(() => {
    clearProducts()
    if (prevPageLoad !== location.pathname) {
      setPrevPageLoad(location.pathname)
    }
  }, [location.pathname, id, prevPageLoad])

  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={name}/>
      </Helmet>
      <ProductList />
      <div ref={pagination}
           className={style.autoPagination}/>
  </>
  )
}

export default Products
