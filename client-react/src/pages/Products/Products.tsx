import React, { FC, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import style from 'pages/Products/Products.module.scss'
import { useObserver } from 'hooks/useObserver'
import ProductItems from 'components/ProductItems/ProductItems'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useLazyAllProductsQuery } from 'store/myStore/myStoreProduct.api'
import { useAppSelector } from 'hooks/useStore'
import selectProduct from 'store/product/product.selector'
import ProductsPanelSetting from 'components/ProductsPanelSetting/ProductsPanelSetting'

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
  const [totalPage, setTotalPage] = useState((data?.result.total || 10) / 10)
  const [page, setPage] = useState(1)

  const getProducts = () => {
    fetchProducts({ page })
    setPage(prevState => prevState + 1)
    setTotalPage((data?.result.total || 10) / 10)
  }

  useObserver(pagination, page, totalPage, isLoading, getProducts)

  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={name}/>
      </Helmet>
      <ProductsPanelSetting />
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
