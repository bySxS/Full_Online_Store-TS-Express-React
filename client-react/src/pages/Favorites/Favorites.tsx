import React, { FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useObserver } from 'hooks/useObserver'
import { useAppActions } from 'hooks/useStore'
import { useLazyGetFavProductsQuery } from 'store/myStore/myStoreFavProduct.api'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import ProductList from 'components/ProductList/ProductList'
import { useProducts } from 'hooks/useSelectors'
import style from '../Products/Products.module.scss'

interface FavoritesProps {
  name: string
}

const Favorites: FC<FavoritesProps> = ({ name }) => {
  // const location = useLocation()
  const { setBreadcrumb } = useBreadcrumb()
  const { changeFilterState } = useAppActions()
  useEffect(() => {
    setBreadcrumb({})
    changeFilterState({})
  }, [])
  const pagination = useRef<HTMLHeadingElement>(null)
  const { allFavProducts, filterState, pageFavProduct, totalFavProduct } = useProducts()
  const { incPageFavProduct } = useAppActions()
  const [limit] = useState(10)
  const [totalPage, setTotalPage] = useState(Math.round(10 / limit) + 1)
  const [fetchProducts,
    { isLoading, isSuccess, isError, data, error }] =
    useLazyGetFavProductsQuery()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
  const getProducts = () => {
    fetchProducts({ page: pageFavProduct, limit, ...filterState })
    incPageFavProduct()
  }
  useObserver(pagination, pageFavProduct, totalPage, isLoading, filterState, getProducts)

  useEffect(() => {
    setTotalPage(Math.round((totalFavProduct || limit) / limit) + 1)
  }, [totalFavProduct])

  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <ProductList products={allFavProducts} />
      <div ref={pagination}
           className={style.autoPagination}/>
      {!allFavProducts && <div>Нет продуктов :(</div>}
    </>
  )
}

export default Favorites
