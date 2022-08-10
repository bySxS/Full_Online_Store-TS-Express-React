import React, { FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import style from 'pages/Products/Products.module.scss'
import { useObserver } from 'hooks/useObserver'
import ProductItems from 'components/ProductItems/ProductItems'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useLazyAllProductsQuery } from 'store/myStore/myStoreProduct.api'
import { useAppActions, useAppSelector } from 'hooks/useStore'
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
  const filterState = useAppSelector(selectProduct.filterState)
  const pageProduct = useAppSelector(selectProduct.pageProduct)
  const totalProduct = useAppSelector(selectProduct.totalProduct)
  const { incPageProduct } = useAppActions()
  const [limit] = useState(10)
  const [totalPage, setTotalPage] = useState(Math.round((totalProduct ?? limit) / limit) + 1)

  const getProducts = () => {
    fetchProducts({ page: pageProduct, limit, ...filterState })
    incPageProduct()
  }

  useEffect(() => {
    setTotalPage(Math.round((totalProduct ?? limit) / limit) + 1)
  }, [totalProduct])

  useObserver(pagination, pageProduct, totalPage, isLoading, getProducts)

  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={name}/>
      </Helmet>
      <Breadcrumbs />
      <ProductsPanelSetting />
      продукты {countProducts}
      {products &&
        <div className={style.productsView}>
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

export default Products
