import React, { FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useLazyGetAllProductsQuery } from 'store/myStore/myStoreProduct.api'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import selectProduct from 'store/product/product.selector'
import ProductList from 'components/ProductList/ProductList'
import { RoutePath } from 'AppRouter'
import style from './Products.module.scss'
import { useObserver } from 'hooks/useObserver'
import { IDParams } from '../ProductDetails/ProductDetails'

interface ProductProps {
  name: string
}

const Products: FC<ProductProps> = ({ name }) => {
  const navigate = useNavigate()
  const pagination = useRef<HTMLHeadingElement>(null)
  const location = useLocation()
  const { id: idParam } = useParams<IDParams>()
  const categoryId = +(idParam || '')
  const filterState = useAppSelector(selectProduct.filterState)
  const pageProduct = useAppSelector(selectProduct.pageProduct)
  const totalProduct = useAppSelector(selectProduct.totalProduct)
  const {
    changeFilterState
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
    totalPage, isLoading, filterState, getProducts)

  useEffect(() => {
    setTotalPage(Math.round((totalProduct || limit) / limit) + 1)
  }, [totalProduct])

  useEffect(() => {
    if (filterState.categoryId &&
      filterState.categoryId > 0 &&
      filterState.categoryId !== categoryId) {
      navigate(RoutePath.PRODUCTS + '/category/' + filterState.categoryId)
    }
    if (!filterState.categoryId && categoryId !== 0) {
      navigate(RoutePath.PRODUCTS)
    }
  }, [filterState])

  useEffect(() => {
    if (categoryId && categoryId > 0) {
      changeFilterState({ categoryId })
    } else if (location.pathname === RoutePath.PRODUCTS) {
      changeFilterState({ categoryId: undefined })
    }
  }, [location.pathname, categoryId])

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
