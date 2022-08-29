import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useBasketToOrderMutation } from 'store/myStore/myStoreBasket.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useAuth } from 'hooks/useSelectors'
import { IBasketToOrderIn } from 'store/myStore/myStoreBasket.interface'
import MyInput from '../UI/MyInput/MyInput'
import style from './BasketForm.module.scss'

const BasketForm = () => {
  const { user, myId } = useAuth()
  const [formState, setFormState] = useState<IBasketToOrderIn>({
    comment: '',
    fullName: (user && user.fullName) ? user.fullName : '',
    userId: myId,
    deliveryAddress: (user && user.deliveryAddress) ? user.deliveryAddress : '',
    phoneNumber: (user && user.phoneNumber) ? user.phoneNumber : ''
  })
  const [toOrder, {
    isLoading, isSuccess, isError, data, error
  }] = useBasketToOrderMutation()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
  const clickSendToOrder = () => {
    toOrder(formState)
    setFormState({} as IBasketToOrderIn)
  }
  return (
    <div className={style.blockBasketForm}>
      <div className={'text-left w-full'}>
        <Form
          noValidate
        >
        <MyInput
            label={'Фамилия Имя Отчество'}
            value={formState.fullName}
            nameInput={'fullName'}
            placeholder={'Введите ФИО'}
            setValue={setFormState}
            icon={<i className="bi bi-file-person"/>}
            isValid={formState.fullName.split(' ').length > 3 && formState.fullName.split(' ')[2].length > 3}
        />
        <MyInput
            label={'Адрес доставки'}
            value={formState.deliveryAddress}
            nameInput={'deliveryAddress'}
            placeholder={'Введите Адрес доставки'}
            setValue={setFormState}
            icon={<i className="bi bi-truck"/>}
            isValid={formState.deliveryAddress.length > 5}
        />
        <MyInput
            label={'Номер телефона'}
            value={formState.phoneNumber}
            nameInput={'phoneNumber'}
            placeholder={'Введите Номер телефона'}
            setValue={setFormState}
            icon={<i className="bi bi-telephone"/>}
            isValid={formState.phoneNumber.length > 5}
        />
          <MyInput
            type={'textarea'}
            label={'Комментарий'}
            value={formState.comment}
            nameInput={'comment'}
            placeholder={'Введите Комментарий (необязательно)'}
            setValue={setFormState}
            icon={<i className="bi bi-chat-left-dots"/>}
          />
        </Form>
      </div>
      <Button variant="success"
              className={'bg-emerald-600 w-full'}
              onClick={clickSendToOrder}
              type={'submit'}
      >
        Купить
      </Button>
    </div>
  )
}

export default BasketForm
