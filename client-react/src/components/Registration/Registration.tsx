import React, { FC, useEffect, useState } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'
import { useRegistrationMutation, useUpdateUserByIdMutation } from 'store/myStore/myStoreUser.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
// import { useNavigate } from 'react-router-dom'
import { IRegistrationIn, IUsers } from 'store/myStore/myStoreUser.interface'
// import { RoutePath } from 'AppRouter'

interface IRegProps {
  onCloseReg?: () => void
  onShowLogin?: () => void
  changeProfile?: boolean
  defaultInfoUser?: IUsers
  showDelAvatar?: boolean
  showEditPass?: boolean
  showEditAvatar?: boolean
}

const Registration: FC<IRegProps> = ({
  changeProfile,
  onCloseReg,
  onShowLogin,
  defaultInfoUser,
  showDelAvatar = false,
  showEditPass = true,
  showEditAvatar = true
}) => {
  // const navigate = useNavigate()
  const [registration,
    { isLoading: isLoadingReg, isSuccess: isSuccessReg, isError: isErrorReg, data: user, error: errorReg }] =
    useRegistrationMutation()
  const [updProfile,
    { isLoading: isLoadingUpd, isSuccess: isSuccessUpd, isError: isErrorUpd, data: userUpd, error: errorUpd }] =
    useUpdateUserByIdMutation()
  useInfoLoading({ isLoading: isLoadingReg, isSuccess: isSuccessReg, isError: isErrorReg, data: user, error: errorReg })
  useInfoLoading({ isLoading: isLoadingUpd, isSuccess: isSuccessUpd, isError: isErrorUpd, data: userUpd, error: errorUpd })
  const [validated, setValidated] = useState(false)
  const [formState, setFormState] = useState<IRegistrationIn>({
    nickname: '',
    email: '',
    password: ''
  })
  const [showPass, setShowPass] = useState(false)

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(form.checkValidity())
  }

  const btnLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const formData = new FormData()
    formData.append('nickname', formState.nickname)
    if ((showEditPass || !changeProfile) && formState.password) {
      formData.append('password', formState.password)
    }
    formData.append('email', formState.email)
    if (formState.address) {
      formData.append('address', formState.address)
    }
    if (formState.city) {
      formData.append('city', formState.city)
    }
    if (formState.fullName) {
      formData.append('fullName', formState.fullName)
    }
    if (formState.deliveryAddress) {
      formData.append('deliveryAddress', formState.deliveryAddress)
    }
    if (formState.phoneNumber) {
      formData.append('phoneNumber', formState.phoneNumber)
    }
    if (formState.isSubscribeToNews) {
      formData.append('isSubscribeToNews',
        formState.isSubscribeToNews ? 'True' : 'False')
    }

    if (formState.delAvatar && showDelAvatar) {
      formData.append('delAvatar',
        formState.delAvatar ? 'True' : 'False')
    }

    if (formState.avatar && showEditAvatar) {
      formData.append('avatar', formState.avatar)
    }
    if (validated) {
      if (!changeProfile) {
        registration(formData)
      } else if (defaultInfoUser && defaultInfoUser.id) {
        updProfile({
          id: defaultInfoUser.id,
          body: formData
        })
      }
    }
  }

  useEffect(() => {
    if (onCloseReg &&
        ((isSuccessReg && user) ||
         (isSuccessUpd && userUpd))) {
      // navigate('/')
      onCloseReg()
    }
  }, [isSuccessReg, isSuccessUpd])

  useEffect(() => {
    if (defaultInfoUser) {
      setFormState({
        nickname: defaultInfoUser.nickname,
        email: defaultInfoUser.email,
        fullName: defaultInfoUser.fullName,
        city: defaultInfoUser.city,
        address: defaultInfoUser.address,
        deliveryAddress: defaultInfoUser.deliveryAddress,
        phoneNumber: defaultInfoUser.phoneNumber,
        isSubscribeToNews: defaultInfoUser.isSubscribeToNews === 1
      })
    }
  }, [])

  const handleClick = () => setShowPass(!showPass)

  const handleChangeFile =
    ({ target: { name, files } }: React.ChangeEvent<HTMLInputElement>) => {
      if (files) {
        setFormState((prev) => ({ ...prev, [name]: files[0] }))
      } else {
        setFormState((prev) => ({ ...prev, [name]: null }))
      }
    }

  const handleChangeCheckbox =
    ({ target: { name, checked } }: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [name]: checked }))
    }

  const handleChangeString =
    ({ target: { name, value }, currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [name]: value }))
      currentTarget.checkValidity()
    }

  return (
    <div>
      <div className={'text-left w-[400px]'}>
        <Form noValidate validated={true}
              onChange={handleChange}>
        <Form.Label>Никнейм</Form.Label>
        <InputGroup hasValidation className="mb-2">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-person"/>
          </InputGroup.Text>
          <Form.Control
            required
            onChange={handleChangeString}
            name={'nickname'}
            placeholder="Введите ник"
            defaultValue={defaultInfoUser &&
                          defaultInfoUser.nickname
              ? defaultInfoUser.nickname
              : ''}
            aria-label="nickname"
            aria-describedby="basic-addon1"
          />
          <Form.Control.Feedback type="invalid">
            Пожалуйста, введите никнейм
          </Form.Control.Feedback>
        </InputGroup>

        <Form.Label>E-mail</Form.Label>
        <InputGroup hasValidation className="mb-2">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            required
            onChange={handleChangeString}
            name={'email'}
            placeholder="Введите E-mail"
            defaultValue={defaultInfoUser &&
                          defaultInfoUser.email
              ? defaultInfoUser.email
              : ''}
            aria-label="email"
            aria-describedby="basic-addon1"
          />
           {/* <Form.Control.Feedback>Отлично!</Form.Control.Feedback> */}
            <Form.Control.Feedback type="invalid">
            Пожалуйста, введите e-mail
            </Form.Control.Feedback>
        </InputGroup>

        {showEditPass &&
         <>
        <Form.Label>Пароль</Form.Label>
        <InputGroup hasValidation className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-pass"/>
          </InputGroup.Text>
          <Form.Control
            required
            onChange={handleChangeString}
            className={'pr-[4.5rem] md'}
            type={showPass ? 'text' : 'password'}
            defaultValue={''}
            placeholder="Введите пароль"
            name={'password'}
          />
          <Button className={'bg-emerald-600'}
                  onClick={handleClick}>
            {showPass ? 'Hide' : 'Show'}
          </Button>
          {/* <Form.Control.Feedback>Отлично!</Form.Control.Feedback> */}
            <Form.Control.Feedback type="invalid">
            Пожалуйста, введите пароль
            </Form.Control.Feedback>
        </InputGroup>
         </>
        }

        <Form.Label>ФИО</Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-file-person"/>
          </InputGroup.Text>
          <Form.Control
            onChange={handleChangeString}
            name={'fullName'}
            placeholder="Введите ФИО"
            defaultValue={defaultInfoUser &&
                          defaultInfoUser.fullName
              ? defaultInfoUser.fullName
              : ''}
            aria-label="fullName"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <Form.Label>Город</Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-bank"/>
          </InputGroup.Text>
          <Form.Control
            onChange={handleChangeString}
            name={'city'}
            placeholder="Введите Город"
            aria-label="city"
            defaultValue={defaultInfoUser &&
                          defaultInfoUser.city
              ? defaultInfoUser.city
              : ''}
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <Form.Label>Адрес</Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-house" />
          </InputGroup.Text>
          <Form.Control
            onChange={handleChangeString}
            name={'address'}
            placeholder="Введите Адрес"
            aria-label="address"
            defaultValue={defaultInfoUser &&
                          defaultInfoUser.address
              ? defaultInfoUser.address
              : ''}
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <Form.Label>Адрес доставки</Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-truck"/>
          </InputGroup.Text>
          <Form.Control
            onChange={handleChangeString}
            name={'deliveryAddress'}
            placeholder="Введите Адрес доставки"
            defaultValue={defaultInfoUser &&
                          defaultInfoUser.deliveryAddress
              ? defaultInfoUser.deliveryAddress
              : ''}
            aria-label="deliveryAddress"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <Form.Label>Номер телефона</Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-telephone"/>
          </InputGroup.Text>
          <Form.Control
            onChange={handleChangeString}
            name={'phoneNumber'}
            placeholder="Введите Номер телефона"
            defaultValue={defaultInfoUser &&
                          defaultInfoUser.phoneNumber
              ? defaultInfoUser.phoneNumber
              : ''}
            aria-label="phoneNumber"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        {showEditAvatar &&
         <Form.Group controlId="formFileMultiple"
                     className="mb-3">
          <Form.Label>Аватар</Form.Label>
          <Form.Control
            onChange={handleChangeFile}
            name={'avatar'}
            type="file"
            size="sm" />
         </Form.Group>
         }
          {showDelAvatar && showEditAvatar && changeProfile &&
          <Form.Group className="mb-3">
            <Form.Check
              onChange={handleChangeCheckbox}
              name={'delAvatar'}
              label="Удалить аватар?"
            />
          </Form.Group>
          }
          <Form.Group className="mb-3">
          <Form.Check
            onChange={handleChangeCheckbox}
            name={'isSubscribeToNews'}
            defaultChecked={defaultInfoUser &&
                            defaultInfoUser.isSubscribeToNews === 1}
            label="Получать новости магазина"
          />
         </Form.Group>
        </Form>
      </div>
      <Button variant="primary"
              className={'bg-emerald-600 w-full'}
              onClick={btnLogin}
              type={'submit'}
      >
        {changeProfile
          ? 'Сохранить изменения'
          : 'Создать аккаунт'
        }
      </Button>
      {onShowLogin && onCloseReg &&
       <>
      <div className={'legend'}>
        <hr className={'flex-auto'}/>
        <div className={'flex-1'}>Есть аккаунт?</div>
        <hr className={'flex-auto'}/>
      </div>
      <Button
        onClick={() => {
          onShowLogin()
          onCloseReg()
        }}
        variant="primary"
        className={'bg-emerald-600 w-full'}>
        Войдите!
      </Button>
       </>
      }
    </div>
  )
}

export default Registration
