import React, { FC, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useLazyAllProductsQuery } from 'store/myStore/myStore.api'
import { useErrorFix } from 'hooks/useErrorFix'
import Loader from 'components/UI/Loader/Loader'
import style from './Product.module.scss'
import { useObserver } from 'hooks/useObserver'
import ProductItems from 'components/ProductItems/ProductItems'
import Alarm from 'components/UI/Alarm/Alarm'

interface ProductProps {
  name: string
}

const Product: FC<ProductProps> = ({ name }) => {
  const pagination = useRef<HTMLHeadingElement>(null)
  const [fetchProducts,
    { isLoading, isSuccess, isError, data: products, error }] =
    useLazyAllProductsQuery()
  const [totalPage, setTotalPage] = useState((products?.result.total || 10) / 10)
  const [page, setPage] = useState(1)
  const err = useErrorFix(isError, error)

  const getProducts = () => {
    fetchProducts({ page })
    setPage(prevState => prevState + 1)
    setTotalPage((products?.result.total || 10) / 10)
  }

  useObserver(pagination, page, totalPage, isLoading, getProducts)

  return (
    <div className="body">
      {isSuccess && products &&
        <div>
          <Helmet>
            <title>{name}</title>
            <meta name="description" content={name}/>
          </Helmet>
          <div className="font-bold">{name}</div>
          <div>{products.result.results.map(product =>
            <ProductItems key={product.id} product={product} />
          )}</div>
        </div>
      }
      <div ref={pagination}
           className={style.autoPagination}/>
      {isLoading && <Loader/>}
      {isSuccess && products && <Alarm message={products.message} />}
      {isError && err && <Alarm message={err} status={'error'} />}
    </div>
  )
}

export default Product
