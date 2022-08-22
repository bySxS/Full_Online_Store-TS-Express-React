import React, { FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useLocation, useParams } from 'react-router-dom'
import { useLazyGetAllProductsQuery } from 'store/myStore/myStoreProduct.api'
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
  const categoryId = +(idParam || '')
  const filterState = useAppSelector(selectProduct.filterState)
  const pageProduct = useAppSelector(selectProduct.pageProduct)
  const totalProduct = useAppSelector(selectProduct.totalProduct)
  const prevPage = useAppSelector(selectProduct.prevPage)
  const {
    changeFilterState,
    setPrevPage
  } = useAppActions()
  const [limit] = useState(10)
  const [totalPage, setTotalPage] = useState(Math.round(10 / limit))

  const [fetchProducts, {
    isLoading, isSuccess, isError, data, error
  }] = useLazyGetAllProductsQuery()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
  const getProducts = () => {
    fetchProducts({ page: pageProduct, limit, ...filterState })
  }

  useObserver(pagination, pageProduct,
    totalPage, isLoading, prevPage, getProducts)

  useEffect(() => {
    setTotalPage(Math.round((totalProduct || limit) / limit) + 1)
  }, [totalProduct])

  useEffect(() => {
    setPrevPage(location.pathname)
    if (categoryId && categoryId > 0) {
      changeFilterState({ categoryId })
    } else {
      changeFilterState({ categoryId: undefined })
    }
  }, [location.pathname, categoryId, prevPage])

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
