import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams, useNavigate } from 'react-router-dom'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { RoutePath } from 'AppRouter'
// import { useAppSelector } from 'hooks/useStore'
import { useLazyGetProductByIdQuery } from 'store/myStore/myStoreProduct.api'
import ProductDetailsDown from 'components/ProductDetailsDown/ProductDetailsDown'
import ProductDetailsHead from 'components/ProductDetailsHead/ProductDetailsHead'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import { addDomainToImgProducts } from 'utils'
import { useCategory } from 'context/CategoryProductContext'
// import selectBasket from 'store/basket/basket.selector'
import style from './ProductDetails.module.scss'

export interface IDParams {
  [id: string]: string
}

const ProductDetails = () => {
  const [product, setProduct] = useState<IProduct>()
  const { setCategory } = useCategory()
  const { id: idParam } = useParams<IDParams>()
  const id = +(idParam || '')
  const navigate = useNavigate()
  const [fetchProductById, { isLoading, isSuccess, isError, data, error }] =
    useLazyGetProductByIdQuery()
  useInfoLoading({ isLoading, isSuccess, isError, data, error })
  useEffect(() => {
    if (!id || isNaN(+id)) {
      navigate(RoutePath.PRODUCTS)
    }
  }, [])
  useEffect(() => {
    if (id && !isNaN(id)) {
      fetchProductById(id)
    }
  }, [id])
  useEffect(() => {
    if (isSuccess && data && data.result) {
      setProduct(addDomainToImgProducts([data.result])[0])
      setCategory({
        categoryName: data.result.categoryName,
        categoryId: data.result.categoryId,
        sectionName: data.result.sectionName,
        sectionId: data.result.sectionId
      })
    }
  }, [isSuccess])
  // const {
  //   addToBasket, delFromBasket
  // } = useAppActions()
  // const isFav = useAppSelector(selectBasket.productIsInBasket(id))

  // const clickAddToBasket = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault()
  //   addToBasket(id)
  // }
  //
  // const removeFromBasket = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault()
  //   delFromBasket(id)
  // }
  return (
    <>
      {isSuccess && product &&
        <>
        <Helmet>
          <title>{product.title}</title>
          <meta name="description" content={product.title}/>
        </Helmet>
        <div className={style.commonContainer}>
          <ProductDetailsHead product={product} />
          <ProductDetailsDown product={product} />
        </div>
        </>
      }
    </>
  )
}

export default ProductDetails
