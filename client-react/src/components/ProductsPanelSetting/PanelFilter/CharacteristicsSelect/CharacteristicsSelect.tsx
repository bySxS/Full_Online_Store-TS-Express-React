import React from 'react'
import { useGetAllCharacteristicsQuery } from 'store/myStore/myStoreCharacteristics.api'
import { useInfoLoading } from 'hooks/useInfoLoading'

const CharacteristicsSelect = () => {
  const {
    isLoading, isSuccess, isError, data, error
  } = useGetAllCharacteristicsQuery({})
  useInfoLoading({ isLoading, isSuccess, isError, data, error })
  return (
    <div>
    ывап
    </div>
  )
}

export default CharacteristicsSelect
