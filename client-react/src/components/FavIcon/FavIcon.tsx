import React, { FC } from 'react'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import {
  useAddToFavProductMutation,
  useDelFromFavProductMutation
} from 'store/myStore/myStoreFavProduct.api'
import selectProduct from 'store/product/product.selector'

interface IFavIconProps {
  productId: number
}

const FavIcon: FC<IFavIconProps> = ({ productId }) => {
  const isInFav = useAppSelector(
    selectProduct.productIsInFavorite(productId)
  )
  const [addToFav, {
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd,
    isError: isErrorAdd,
    data: dataAdd,
    error: errorAdd
  }] = useAddToFavProductMutation()
  useInfoLoading({
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd,
    isError: isErrorAdd,
    data: dataAdd,
    error: errorAdd
  })
  const [delToFav, {
    isLoading: isLoadingDel,
    isSuccess: isSuccessDel,
    isError: isErrorDel,
    data: dataDel,
    error: errorDel
  }] = useDelFromFavProductMutation()
  useInfoLoading({
    isLoading: isLoadingDel,
    isSuccess: isSuccessDel,
    isError: isErrorDel,
    data: dataDel,
    error: errorDel
  })
  const { delOneFavProduct } = useAppActions()

  const addClick = () => {
    addToFav({ productId })
  }

  const delClick = () => {
    delToFav({ productId })
    setTimeout(() => {
      delOneFavProduct(productId)
    }, 500)
  }

  return (
    <>
      {isInFav
        ? <i className="bi bi-star-fill text-yellow-400" onClick={delClick}/>
        : <i className="bi bi-star" onClick={addClick}/>
      }
    </>
  )
}

export default FavIcon
