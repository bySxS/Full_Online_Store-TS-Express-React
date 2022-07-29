import React, { FC, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useLazyAllProductsQuery } from 'store/myStore/myStore.api'
import style from './Product.module.scss'
import { useObserver } from 'hooks/useObserver'
import ProductItems from 'components/ProductItems/ProductItems'
import { useInfoLoading } from 'hooks/useInfoLoading'

interface ProductProps {
  name: string
}

const Product: FC<ProductProps> = ({ name }) => {
  const pagination = useRef<HTMLHeadingElement>(null)
  const [fetchProducts,
    { isLoading, isSuccess, isError, data: products, error }] =
    useLazyAllProductsQuery()
  useInfoLoading({ isLoading, isSuccess, isError, data: products, error })
  const [totalPage, setTotalPage] = useState((products?.result.total || 10) / 10)
  const [page, setPage] = useState(1)

  const getProducts = () => {
    fetchProducts({ page })
    setPage(prevState => prevState + 1)
    setTotalPage((products?.result.total || 10) / 10)
  }

  useObserver(pagination, page, totalPage, isLoading, getProducts)

  return (
    <div>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={name}/>
      </Helmet>
      <div className="font-bold">{name}</div>
      {isSuccess && products &&
          <div>
            {products.result.results.map(product =>
            <ProductItems key={product.id} product={product} />
            )}
          </div>
      }
      <div ref={pagination}
           className={style.autoPagination}/>
      {!products && <div>Нет продуктов :(</div>}
    </div>
  )
}

export default Product
