import React, { FC, useEffect, useState } from 'react'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { Button } from 'react-bootstrap'
import {
  useAddCharacteristicValueMutation,
  useGetCharacteristicValueByNameIdQuery,
  useUpdateCharacteristicValueMutation
} from 'store/myStore/myStoreCharacteristics.api'
import MyInput from 'components/UI/MyInput/MyInput'
import MySelect from 'components/UI/MySelect/MySelect'
import { ICharNameList } from 'store/myStore/myStoreCharacteristics.interface'

interface IFormState {
  productId: number,
  characteristicsValueId: number,
  characteristicsNameId: number,
  value: string
}

export interface IFormStateCharValue {
  title: string,
  type: string,
  body: {
    productId: number,
    characteristicsValueId?: number,
    characteristicsNameId?: number,
    characteristicsName?: string
    value?: string
  }
}

interface IFormCharValueEdit {
  payload: IFormStateCharValue
  onClose?: () => void
}

const FormCharValueEdit: FC<IFormCharValueEdit> = ({
  payload: { body, type },
  onClose
}) => {
  const [formState, setFormState] = useState<IFormState>({
    productId: body.productId,
    characteristicsNameId: body.characteristicsNameId || 0,
    characteristicsValueId: body.characteristicsValueId || 0,
    value: ''
  })
  const [showListValues, setShowListValues] = useState(true)
  const [values, setValues] = useState<ICharNameList[]>([])
  const [updCharValue, {
    error: errorUpd,
    data: dataUpd,
    isError: isErrorUpd,
    isLoading: isLoadingUpd,
    isSuccess: isSuccessUpd
  }] = useUpdateCharacteristicValueMutation()
  useInfoLoading({
    error: errorUpd,
    data: dataUpd,
    isError: isErrorUpd,
    isLoading: isLoadingUpd,
    isSuccess: isSuccessUpd
  })
  const [addCharValue, {
    error: errorAdd,
    data: dataAdd,
    isError: isErrorAdd,
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd
  }] = useAddCharacteristicValueMutation()
  useInfoLoading({
    error: errorAdd,
    data: dataAdd,
    isError: isErrorAdd,
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd
  })
  const {
    error: errorGet,
    data: dataGet,
    isError: isErrorGet,
    isLoading: isLoadingGet,
    isSuccess: isSuccessGet
  } = useGetCharacteristicValueByNameIdQuery(formState?.characteristicsNameId || 0, {
    skip: formState?.characteristicsNameId === 0
  })
  useInfoLoading({
    error: errorGet,
    data: dataGet,
    isError: isErrorGet,
    isLoading: isLoadingGet,
    isSuccess: isSuccessGet
  })
  useEffect(() => {
    if (isSuccessGet && dataGet) {
      setValues([{ propertyValue: '' }].concat(dataGet.result))
      if (dataGet.result.length === 0) {
        setShowListValues(false)
      }
    }
  }, [isSuccessGet, dataGet])
  const clickHandle = () => {
    if (type === 'add') {
      addCharValue(formState)
    }
    if (type === 'upd') {
      updCharValue(formState)
    }
    setFormState({ ...formState, value: '' })
  }
  useEffect(() => {
    if (onClose &&
      (isSuccessAdd || isSuccessUpd) &&
      (dataUpd || dataAdd)) {
      setTimeout(() => {
        onClose()
      }, 1000)
    }
  }, [dataAdd, dataUpd, isSuccessAdd, isSuccessUpd])
  return (
    <div>
      {showListValues && values.length > 0
        ? (<>
          <Button variant="outline-warning"
                  className={'bg-yellow-400 text-black mb-2 w-full'}
                  onClick={() => setShowListValues(!showListValues)}
                  type={'submit'}
          >
            Добавить новое значение
          </Button>
          <MySelect
            label={'Выберите имеющиеся значение или добавьте новое'}
            name={'value'}
            defaultValue={''}
            valuesOption={values.map(i => ({
              value: i.propertyValue,
              name: i.propertyValue
            }))}
            setValue={setFormState}
          />
          </>)
        : <MyInput
          nameInput={'value'}
          value={formState.value}
          placeholder={'Введите значение характеристики'}
          label={'Значение характеристики'}
          setValue={setFormState}
          isValid={(formState.value && formState.value.length > 0
          ) || false}
        />
      }
      <Button variant="success"
              className={'bg-emerald-600 w-full'}
              onClick={clickHandle}
              type={'submit'}
              disabled={(!formState.value || formState.value === '') || false}
      >
        {type === 'upd'
          ? 'Сохранить значение'
          : 'Добавить значение'
        }
      </Button>
    </div>
  )
}

export default FormCharValueEdit
