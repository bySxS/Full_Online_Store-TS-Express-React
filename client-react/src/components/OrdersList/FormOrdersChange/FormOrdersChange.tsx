import React, { FC, useEffect, useState } from 'react'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { Button } from 'react-bootstrap'
import { useChangeOrderMutation } from 'store/myStore/myStoreBasket.api'
import { IOrderChange } from 'store/myStore/myStoreBasket.interface'
import MyInput from 'components/UI/MyInput/MyInput'
import MySelect from 'components/UI/MySelect/MySelect'

interface IFormOrdersChange {
  basketId: number
  defaultValue: IOrderChange
  onCloseWindow: () => void
}

const FormOrdersChange: FC<IFormOrdersChange> = ({
  defaultValue,
  onCloseWindow,
  basketId
}) => {
  const [formState, setFormState] = useState(defaultValue)
  const [changeOrder, {
    isLoading, isSuccess, isError, data, error
  }] = useChangeOrderMutation()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
  const clickHandle = () => {
    changeOrder({
      basketId,
      body: formState
    })
  }
  useEffect(() => {
    if (isSuccess && data && onCloseWindow) {
      setTimeout(() => {
        onCloseWindow()
      }, 1000)
    }
  }, [isSuccess, data])
  return (
    <div>
      <MyInput
        placeholder={'Введите или дополните комментарий'}
        value={formState.comment}
        nameInput={'comment'}
        setValue={setFormState}
        label={'Комментарий к заказу'}
        type={'textarea'}
        sizeTextareaPx={150}
      />
      <MySelect
        name={'status'}
        valuesOption={[
          { value: 'InProcessing', name: 'В обработке' },
          { value: 'InDelivery', name: 'В доставке' },
          { value: 'Completed', name: 'Выполнен' },
          { value: 'Cancelled', name: 'Отменён' }
        ]}
        defaultValue={formState.status}
        setValue={setFormState}
        label={'Статус'}
      />
      {formState.status === 'InDelivery' &&
      <MyInput
        placeholder={'Введите дату доставки в формате \'2022-05-24 15:00\''}
        value={formState.deliveryDate}
        nameInput={'deliveryDate'}
        setValue={setFormState}
        label={'Дата доставки в формате \'2022-05-24 15:00\''}
      />
      }
      {(formState.status === 'Completed' ||
          formState.status === 'Cancelled') &&
        <MyInput
          placeholder={'Введите дату обработки в формате \'2022-05-24 15:00\''}
          value={formState.dateProcessing}
          nameInput={'dateProcessing'}
          setValue={setFormState}
          label={'Дата обработки в формате \'2022-05-24 15:00\''}
        />
      }
      <Button variant="success"
              className={'bg-emerald-600 w-full'}
              onClick={clickHandle}
              type={'submit'}
      >
        Обрабоботать заказ
      </Button>
    </div>
  )
}

export default FormOrdersChange
