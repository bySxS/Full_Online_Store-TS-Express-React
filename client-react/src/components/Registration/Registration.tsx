import React, { FC, useEffect, useState } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'
import { useRegistrationMutation } from 'store/myStore/myStoreUser.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { NavLink, useNavigate } from 'react-router-dom'
import { IRegistrationIn } from 'store/myStore/myStoreUser.interface'
import { RoutePath } from 'AppRouter'

const Registration: FC = () => {
  const navigate = useNavigate()
  const [registration, { isLoading, isSuccess, isError, data: user, error }] =
    useRegistrationMutation()
  useInfoLoading({ isLoading, isSuccess, isError, data: user, error })
  // const [validated, setValidated] = useState(false)
  // const [file, setFile] = useState<File | null>(null)

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   const form = event.currentTarget
  //   // event.preventDefault()
  //   if (!form.checkValidity()) {
  //     event.stopPropagation()
  //   }
  //   setValidated(true)
  //   event.preventDefault()
  // }

  const [formState, setFormState] = React.useState<IRegistrationIn>({
    nickname: '',
    email: '',
    password: ''
  })
  const [showPass, setShowPass] = useState(false)

  const btnLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const formData = new FormData()
    formData.append('nickname', formState.nickname)
    formData.append('password', formState.password)
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
    if (formState.avatar) {
      formData.append('avatar', formState.avatar)
    }
    // if (validated) {
    registration(formData)
    // }
  }

  useEffect(() => {
    if (isSuccess && user) {
      navigate('/')
    }
  }, [isSuccess])

  const handleClick = () => setShowPass(!showPass)

  const handleChangeFile =
    ({ target: { name, files } }: React.ChangeEvent<HTMLInputElement>) => {
      if (files) {
        // setFile(files[0])
        setFormState((prev) => ({ ...prev, [name]: files[0] }))
      } else {
        // setFile(null)
        setFormState((prev) => ({ ...prev, [name]: null }))
      }
    }

  const handleChangeCheckbox =
    ({ target: { name, checked } }: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [name]: checked }))
    }

  const handleChangeString =
    ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [name]: value }))
    }

  return (
    <div>
      <div className={'text-left'}>
        <Form.Label>Никнейм</Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-person"/>
          </InputGroup.Text>
          <Form.Control
            onChange={handleChangeString}
            name={'nickname'}
            placeholder="Введите ник"
            aria-label="nickname"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <Form.Label>E-mail</Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            onChange={handleChangeString}
            name={'email'}
            placeholder="Введите E-mail"
            aria-label="email"
            aria-describedby="basic-addon1"
          />
           {/* <Form.Control.Feedback>Отлично!</Form.Control.Feedback> */}
           {/* <Form.Control.Feedback type="invalid"> */}
           {/* Пожалуйста, введите e-mail */}
           {/* </Form.Control.Feedback> */}
        </InputGroup>

        <Form.Label>Пароль</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-pass"/>
          </InputGroup.Text>
          <Form.Control
            onChange={handleChangeString}
            className={'pr-[4.5rem] md'}
            type={showPass ? 'text' : 'password'}
            placeholder="Введите пароль"
            name={'password'} />
          <Button className={'bg-emerald-600'} onClick={handleClick}>
            {showPass ? 'Hide' : 'Show'}
          </Button>
           {/* <Form.Control.Feedback type="invalid"> */}
           {/* Пожалуйста, введите пароль */}
           {/* </Form.Control.Feedback> */}
        </InputGroup>

        <Form.Label>ФИО</Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-file-person"/>
          </InputGroup.Text>
          <Form.Control
            onChange={handleChangeString}
            name={'fullName'}
            placeholder="Введите ФИО"
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
            aria-label="phoneNumber"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        {/* <FileUpload limit={1} multiple={false} name='avatar' /> */}
         <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Аватар</Form.Label>
          <Form.Control
            onChange={handleChangeFile}
            name={'avatar'}
            type="file"
            size="sm" />
         </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            onChange={handleChangeCheckbox}
            name={'isSubscribeToNews'}
            label="Получать новости магазина"
          />
        </Form.Group>
      </div>
      <Button variant="primary"
              className={'bg-emerald-600 w-full'}
              onClick={btnLogin}
              type={'submit'}
      >
        Создать аккаунт
      </Button>
      <div className={'legend'}>
        <hr className={'flex-auto'}/>
        <div className={'flex-1'}>Есть аккаунт?</div>
        <hr className={'flex-auto'}/>
      </div>
      <NavLink to={RoutePath.LOGIN}>
        <Button variant="primary" className={'bg-emerald-600 w-full'}>
          Войдите!
        </Button>
      </NavLink>
    </div>
  )
}

export default Registration
