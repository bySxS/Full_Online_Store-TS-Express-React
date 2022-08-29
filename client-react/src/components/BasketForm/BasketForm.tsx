import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useBasketToOrderMutation } from 'store/myStore/myStoreBasket.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useAuth } from 'hooks/useSelectors'
import { IBasketToOrderIn } from 'store/myStore/myStoreBasket.interface'
import { useDebounce } from 'hooks/useDebounce'
import { validate } from '../../utils/validator'
import MyInput from '../UI/MyInput/MyInput'
import style from './BasketForm.module.scss'

const BasketForm = () => {
  const { user, myId } = useAuth()
  const [showSuccess, setSuccess] = useState(false)
  const [formState, setFormState] = useState<IBasketToOrderIn>({
    comment: '',
    fullName: (user && user.fullName) ? user.fullName : '',
    userId: myId,
    deliveryAddress: (user && user.deliveryAddress) ? user.deliveryAddress : '',
    phoneNumber: (user && user.phoneNumber) ? user.phoneNumber : ''
  })
  const formStateDebounce = useDebounce(formState)
  const [toOrder, {
    isLoading, isSuccess, isError, data, error
  }] = useBasketToOrderMutation()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
  const clickSendToOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!validated) {
      return false
    }
    toOrder(formState)
    setSuccess(true)
  }
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState<{
    deliveryAddress?: string
    phoneNumber?: string
    fullName?: string
  }>({})
  useEffect(() => {
    const result = validate(formState)
    setErrors(result.errors)
    setValidated(result.success)
  }, [formStateDebounce])
  return (
    <>
      {!showSuccess
        ? (<div className={style.blockBasketForm}>
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
                isValid={!errors.fullName}
                textError={errors.fullName}
              />
              <MyInput
                label={'Адрес доставки'}
                value={formState.deliveryAddress}
                nameInput={'deliveryAddress'}
                placeholder={'Введите адрес доставки'}
                setValue={setFormState}
                icon={<i className="bi bi-truck"/>}
                isValid={!errors.deliveryAddress}
                textError={errors.deliveryAddress}
              />
              <MyInput
                label={'Номер телефона'}
                value={formState.phoneNumber}
                nameInput={'phoneNumber'}
                placeholder={'Введите номер телефона'}
                setValue={setFormState}
                icon={<i className="bi bi-telephone"/>}
                isValid={!errors.phoneNumber}
                textError={errors.phoneNumber}
              />
              <MyInput
                type={'textarea'}
                label={'Комментарий'}
                value={formState.comment}
                nameInput={'comment'}
                placeholder={'Введите комментарий (необязательно) отделение новой почти, почтовый индекс'}
                setValue={setFormState}
                icon={<i className="bi bi-chat-left-dots"/>}
              />
            </Form>
          </div>
          <Button variant="success"
                  className={'bg-emerald-600 w-full'}
                  onClick={clickSendToOrder}
                  type={'submit'}
                  disabled={!validated}
          >
            Купить
          </Button>
        </div>
          )
        : (
          <div className={'text-green-500 text-center text-4xl mx-4'}>
            Спасибо за покупку! Менеджер свяжется с вами.
          </div>
          )
      }
    </>
  )
}

export default BasketForm
