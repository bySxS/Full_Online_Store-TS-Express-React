import React, { FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import style from 'pages/Products/Products.module.scss'
import { useObserver } from 'hooks/useObserver'
import ProductItems from 'components/ProductItems/ProductItems'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useLazyAllProductsQuery } from 'store/myStore/myStoreProduct.api'
import { useAppSelector } from 'hooks/useStore'
import selectProduct from 'store/product/product.selector'
import ProductsPanelSetting from 'components/ProductsPanelSetting/ProductsPanelSetting'
import { Breadcrumbs } from 'components/Breadcrumb/Breadcrumb'

interface ProductProps {
  name: string
}

const Products: FC<ProductProps> = ({ name }) => {
  const pagination = useRef<HTMLHeadingElement>(null)
  const [fetchProducts,
    { isLoading, isSuccess, isError, data, error }] =
    useLazyAllProductsQuery()
  useInfoLoading({ isLoading, isSuccess, isError, data, error })
  const products = useAppSelector(selectProduct.allProducts)
  const countProducts = useAppSelector(selectProduct.countProducts)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPage, setTotalPage] = useState(Math.round((data?.result?.total ?? limit) / limit) + 1)

  const getProducts = () => {
    console.log(page, totalPage)
    fetchProducts({ page, limit })
    setPage(prev => prev + 1)
  }

  useEffect(() => {
    setTotalPage(Math.round((data?.result?.total ?? limit) / limit) + 1)
  }, [data])

  useObserver(pagination, page, totalPage, isLoading, getProducts)

  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={name}/>
      </Helmet>
      <Breadcrumbs />
      <ProductsPanelSetting />
      продукты {countProducts}
      {isSuccess && products &&
        <div className={style.productsView}>
            {products.map(product =>
            <ProductItems key={product.id} product={product} />
            )}
        </div>
      }
      <div ref={pagination}
           className={style.autoPagination}/>
      {!data && <div>Нет продуктов :(</div>}
    </>
  )
}

export default Products
