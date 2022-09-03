import React, { useEffect, useState } from 'react'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { Button } from 'react-bootstrap'
import {
  useAddTypePriceMutation,
  useDeleteTypePriceMutation,
  useGetAllTypePriceQuery,
  useUpdateTypePriceMutation
} from 'store/myStore/myStorePrice.api'
import { ITypePrice } from 'store/myStore/myStorePrice.interface'
import style from './EditTypePrice.module.scss'

const EditTypePrice = () => {
  const [priceType, setPriceType] = useState<ITypePrice[]>([])
  const {
    error: errorPrice,
    data: dataPrice,
    isError: isErrorPrice,
    isLoading: isLoadingPrice,
    isSuccess: isSuccessPrice
  } = useGetAllTypePriceQuery('')
  useInfoLoading({
    error: errorPrice,
    data: dataPrice,
    isError: isErrorPrice,
    isLoading: isLoadingPrice,
    isSuccess: isSuccessPrice
  })
  useEffect(() => {
    if (isSuccessPrice && dataPrice) {
      setPriceType(dataPrice?.result?.results)
    }
  }, [isSuccessPrice, dataPrice])

  const [addPriceType, {
    error: errorAdd,
    data: dataAdd,
    isError: isErrorAdd,
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd
  }] = useAddTypePriceMutation()
  useInfoLoading({
    error: errorAdd,
    data: dataAdd,
    isError: isErrorAdd,
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd
  })
  const [delPriceType, {
    error: errorDel,
    data: dataDel,
    isError: isErrorDel,
    isLoading: isLoadingDel,
    isSuccess: isSuccessDel
  }] = useDeleteTypePriceMutation()
  useInfoLoading({
    error: errorDel,
    data: dataDel,
    isError: isErrorDel,
    isLoading: isLoadingDel,
    isSuccess: isSuccessDel
  })
  const [updPriceType, {
    error: errorUpd,
    data: dataUpd,
    isError: isErrorUpd,
    isLoading: isLoadingUpd,
    isSuccess: isSuccessUpd
  }] = useUpdateTypePriceMutation()
  useInfoLoading({
    error: errorUpd,
    data: dataUpd,
    isError: isErrorUpd,
    isLoading: isLoadingUpd,
    isSuccess: isSuccessUpd
  })
  const clickChangePriceType = (priceTypeId: number, priceName: string) => {
    const name = prompt('Укажите новое название типа цены', priceName)
    if (name && name.length > 1) {
      updPriceType({ name, priceTypeId })
    }
  }
  const clickDeletePriceType = (priceTypeId: number, priceName: string) => {
    const result = confirm('Вы уверены что хотите удалить тип цены - ' + priceName + '?')
    if (result) {
      delPriceType(priceTypeId)
    }
  }
  const clickAddPriceType = () => {
    const name = prompt('Укажите название типа цены', '')
    if (name && name.length > 1) {
      addPriceType(name)
    }
  }

  return (
    <div className={style.block}>
      <div className={style.blockButton}>
        <Button
          variant={'outline-warning'}
          onClick={clickAddPriceType}
          className={style.button}
        >
          Добавить тип цены
        </Button>
      </div>
      <div className={style.blockPriceType}>
      {priceType &&
        priceType.map(price =>
        <div
          key={price.id}
          className={style.priceType}
        >
          {price.name}
          <span
            onClick={() => clickChangePriceType(price.id, price.name)}
            className={style.link}
            title={'Редактировать'}
          >
          <i className="bi bi-pencil-fill text-indigo-700"/>
        </span>
          <span
            onClick={() => clickDeletePriceType(price.id, price.name)}
            className={style.link}
            title={'Удалить'}
          >
          <i className="bi bi-trash3-fill text-red-600"/>
        </span>
        </div>
        )
      }
      </div>
    </div>
  )
}

export default EditTypePrice
