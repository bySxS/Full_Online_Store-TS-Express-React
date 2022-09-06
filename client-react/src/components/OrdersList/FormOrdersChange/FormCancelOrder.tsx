import React, { FC, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useCancelOrderMutation } from 'store/myStore/myStoreBasket.api'
import MyInput from 'components/UI/MyInput/MyInput'

interface IFormCancelOrder {
  basketId: number,
  onCloseWindow?: () => void
}

const FormCancelOrder: FC<IFormCancelOrder> = ({
  basketId,
  onCloseWindow
}) => {
  const [formState, setFormState] = useState({
    basketId,
    comment: ''
  })
  const [cancelOrder, {
    isLoading, isSuccess, isError, data, error
  }] = useCancelOrderMutation()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
  const clickHandle = () => {
    cancelOrder(formState)
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
        placeholder={'Введите причину отмены'}
        value={formState.comment}
        nameInput={'comment'}
        setValue={setFormState}
        label={'Причина отмены заказа №' + basketId}
        type={'textarea'}
        sizeTextareaPx={150}
      />
      <Button variant="success"
              className={'bg-emerald-600 w-full'}
              onClick={clickHandle}
              type={'submit'}
      >
        Отменить заказ
      </Button>
    </div>
  )
}

export default FormCancelOrder
