import React, { FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useObserver } from 'hooks/useObserver'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import { useLazyGetFavProductsQuery } from 'store/myStore/myStoreFavProduct.api'
import selectProduct from 'store/product/product.selector'
import ProductItems from 'components/ProductItems/ProductItems'
import ProductsPanelSetting from 'components/ProductsPanelSetting/ProductsPanelSetting'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import style from '../Products/Products.module.scss'

interface FavoritesProps {
  name: string
}

const Favorites: FC<FavoritesProps> = ({ name }) => {
  // const location = useLocation()
  const { setBreadcrumb } = useBreadcrumb()
  useEffect(() => {
    setBreadcrumb({})
  }, [])
  const pagination = useRef<HTMLHeadingElement>(null)
  const products = useAppSelector(selectProduct.allFavProducts)
  const filterState = useAppSelector(selectProduct.filterState)
  const pageProduct = useAppSelector(selectProduct.pageFavProduct)
  const totalProduct = useAppSelector(selectProduct.totalFavProduct)
  const viewProducts = useAppSelector(selectProduct.viewProducts)
  const { incPageFavProduct } = useAppActions()
  const [limit] = useState(10)
  // const [prevPageLoad] = useState(location.pathname)
  const [totalPage, setTotalPage] = useState(Math.round(10 / limit) + 1)
  const [fetchProducts,
    { isLoading, isSuccess, isError, data, error }] =
    useLazyGetFavProductsQuery()
  useInfoLoading({ isLoading, isSuccess, isError, data, error })
  const getProducts = () => {
    fetchProducts({ page: pageProduct, limit, ...filterState })
    incPageFavProduct()
  }
  useObserver(pagination, pageProduct, totalPage, isLoading, filterState, getProducts)

  useEffect(() => {
    setTotalPage(Math.round((totalProduct || limit) / limit) + 1)
  }, [totalProduct])

  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <ProductsPanelSetting />
      {isSuccess && products &&
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
      {!products && <div>Нет продуктов :(</div>}
    </>
  )
}

export default Favorites
