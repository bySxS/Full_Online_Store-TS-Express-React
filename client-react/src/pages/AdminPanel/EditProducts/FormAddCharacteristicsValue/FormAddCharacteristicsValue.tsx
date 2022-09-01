import React, { FC, useEffect } from 'react'
import { useInfoLoading } from 'hooks/useInfoLoading'
import {
  useAddCharacteristicValueMutation,
  useDeleteCharacteristicValueMutation,
  useLazyGetAllCharacteristicsNameByCategoryIdQuery,
  useLazyGetCharacteristicProductByIdQuery,
  useUpdateCharacteristicValueMutation
} from 'store/myStore/myStoreCharacteristics.api'

interface IFormAddCharacteristicsValue {
  productId: number
  categoryId: number
}

const FormAddCharacteristicsValue: FC<IFormAddCharacteristicsValue> = ({
  productId,
  categoryId
}) => {
  const [getCharName, {
    error: errorName,
    data: dataName,
    isError: isErrorName,
    isLoading: isLoadingName,
    isSuccess: isSuccessName
  }] = useLazyGetAllCharacteristicsNameByCategoryIdQuery()
  useInfoLoading({
    error: errorName,
    data: dataName,
    isError: isErrorName,
    isLoading: isLoadingName,
    isSuccess: isSuccessName
  })
  const [getCharValue, {
    error: errorValue,
    data: dataValue,
    isError: isErrorValue,
    isLoading: isLoadingValue,
    isSuccess: isSuccessValue
  }] = useLazyGetCharacteristicProductByIdQuery()
  useInfoLoading({
    error: errorValue,
    data: dataValue,
    isError: isErrorValue,
    isLoading: isLoadingValue,
    isSuccess: isSuccessValue
  })

  useUpdateCharacteristicValueMutation()
  useDeleteCharacteristicValueMutation()
  useAddCharacteristicValueMutation()

  useEffect(() => {
    getCharName({ alsoParents: true, categoryId })
    getCharValue(productId)
  }, [])

  useEffect(() => {
    if (isSuccessName && dataName && isSuccessValue && dataValue) {
      // Todo обьединить в новый стейт вывести и добавить кнопки редактирования
    }
  }, [isSuccessValue, isSuccessName, dataValue, dataName])

  return (
    <div>
      asdf
    </div>
  )
}

export default FormAddCharacteristicsValue
