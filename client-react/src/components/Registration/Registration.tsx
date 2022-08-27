import React, { FC, useEffect, useState } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'
import { useRegistrationMutation, useUpdateUserByIdMutation } from 'store/myStore/myStoreUser.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { IRegistrationIn, IUsers } from 'store/myStore/myStoreUser.interface'
import { useAuth } from 'hooks/useAuth'
import { useDebounce } from 'hooks/useDebounce'

interface IRegProps {
  onCloseReg?: () => void
  onShowLogin?: () => void
  changeProfile?: boolean
  onlyShowInfo?: boolean
  defaultInfoUser?: IUsers
  showDelAvatar?: boolean
  showEditPass?: boolean
  showEditAvatar?: boolean
}

const Registration: FC<IRegProps> = ({
  changeProfile = false,
  onlyShowInfo = false,
  onCloseReg,
  onShowLogin,
  defaultInfoUser,
  showDelAvatar = false,
  showEditPass = true,
  showEditAvatar = true
}) => {
  // const navigate = useNavigate()
  const [registration, {
    isLoading: isLoadingReg,
    isSuccess: isSuccessReg,
    isError: isErrorReg,
    data: user,
    error: errorReg
  }] = useRegistrationMutation()
  const [updProfile, {
    isLoading: isLoadingUpd,
    isSuccess: isSuccessUpd,
    isError: isErrorUpd,
    data: userUpd,
    error: errorUpd
  }] = useUpdateUserByIdMutation()
  useInfoLoading({
    isLoading: isLoadingReg,
    isSuccess: isSuccessReg,
    isError: isErrorReg,
    data: user,
    error: errorReg
  })
  useInfoLoading({
    isLoading: isLoadingUpd,
    isSuccess: isSuccessUpd,
    isError: isErrorUpd,
    data: userUpd,
    error: errorUpd
  })
  const [formState, setFormState] = useState<IRegistrationIn>({
    nickname: (defaultInfoUser && defaultInfoUser.nickname ? defaultInfoUser.nickname : ''),
    email: (defaultInfoUser && defaultInfoUser.email ? defaultInfoUser.email : ''),
    fullName: (defaultInfoUser && defaultInfoUser.fullName ? defaultInfoUser.fullName : ''),
    city: (defaultInfoUser && defaultInfoUser.city ? defaultInfoUser.city : ''),
    address: (defaultInfoUser && defaultInfoUser.address ? defaultInfoUser.address : ''),
    deliveryAddress: (defaultInfoUser && defaultInfoUser.deliveryAddress ? defaultInfoUser.deliveryAddress : ''),
    phoneNumber: (defaultInfoUser && defaultInfoUser.phoneNumber ? defaultInfoUser.phoneNumber : ''),
    isSubscribeToNews: (defaultInfoUser && defaultInfoUser.isSubscribeToNews ? (defaultInfoUser.isSubscribeToNews === 1) : false)
  })
  const formStateDebounce = useDebounce(formState)
  const [showPass, setShowPass] = useState(false)
  const { isAdmin, nickname } = useAuth()
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    rePassword?: string
    nickname?: string
    fullName?: string
  }>({})

  const validate = (): boolean => {
    let isValid = true
    let nickname
    if (!formState.nickname || formState.nickname.trim() === '') {
      nickname = 'Пожалуйста, введите никнейм'
      isValid = false
    }
    let email
    if (!formState.email || formState.email.trim() === '') {
      email = 'Пожалуйста, введите e-mail'
      isValid = false
    } else if (!formState.email.includes('@')) {
      email = 'Пожалуйста, введите корректный e-mail'
      isValid = false
    }

    let password
    let rePassword
    if (showEditPass) {
      if (!formState.password || formState.password.trim() === '') {
        password = 'Пожалуйста, введите пароль'
        isValid = false
      } else if (formState.password.length <= 6) {
        password = 'Пароль должен быть больше 6 символов'
        isValid = false
      }

      if ((formState.rePassword !== formState.password)) {
        rePassword = 'Пароль не совпадает'
        isValid = false
      }
    }

    let fullName
    if (!formState.fullName || formState.fullName.trim() === '') {
      fullName = 'Пожалуйста, введите ФИО'
      isValid = false
    }

    setErrors({
      nickname,
      email,
      password,
      rePassword,
      fullName
    })
    setValidated(isValid)
    return isValid
  }

  const btnLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!validated) {
      return false
    }
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
    if (formState.rolesId && isAdmin) {
      formData.append('rolesId', String(formState.rolesId))
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

    if (!changeProfile) {
      registration(formData)
    } else if (defaultInfoUser && defaultInfoUser.id) {
      updProfile({
        id: defaultInfoUser.id,
        body: formData
      })
    }
  }

  useEffect(() => {
    if (!onlyShowInfo) {
      validate()
    }
  }, [formStateDebounce, showEditPass])

  useEffect(() => {
    if (onCloseReg &&
        ((isSuccessReg && user) ||
         (isSuccessUpd && userUpd))) {
      // navigate('/')
      onCloseReg()
    }
  }, [isSuccessReg, isSuccessUpd])

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

  const handleChangeInput =
    ({ target: { name, value }, currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [name]: value }))
      currentTarget.checkValidity()
    }

  const confirmRoles = (event: React.ChangeEvent<HTMLSelectElement>, prevValue: number) => {
    const { target: { name, value } } = event
    let result = isAdmin
    if (name === 'rolesId' &&
      (+(value) > 1) &&
      isAdmin && defaultInfoUser &&
      nickname === defaultInfoUser.nickname) {
      result = confirm('Вы уверены что хотите понизить себе группу? вы потеряете доступ админа!')
    }
    if (!result) {
      event.target.value = String(prevValue)
      event.preventDefault()
      event.stopPropagation()
    } else {
      handleChangeSelect(event)
    }
  }

  const handleChangeSelect =
    ({ target: { name, value }, currentTarget }: React.ChangeEvent<HTMLSelectElement>) => {
      setFormState((prev) => ({ ...prev, [name]: value }))
      currentTarget.checkValidity()
    }

  return (
    <div>
      <div className={'text-left w-[400px]'}>
        <Form
          noValidate
        >

        {(!onlyShowInfo ||
          (defaultInfoUser &&
           defaultInfoUser.nickname)) &&
        <>
        <Form.Label>Никнейм</Form.Label>
        <InputGroup hasValidation className="mb-2">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-person"/>
          </InputGroup.Text>
          <Form.Control
            required
            onChange={handleChangeInput}
            name={'nickname'}
            disabled={onlyShowInfo}
            isValid={!errors.nickname && !onlyShowInfo}
            isInvalid={!!errors.nickname}
            placeholder="Введите ник"
            value={formState.nickname}
            // defaultValue={defaultInfoUser &&
            //               defaultInfoUser.nickname
            //   ? defaultInfoUser.nickname
            //   : ''}
            aria-label="nickname"
            aria-describedby="basic-addon1"
          />
          <Form.Control.Feedback type="invalid">
            {errors.nickname}
          </Form.Control.Feedback>
        </InputGroup>
        </>
        }

        {(!onlyShowInfo ||
         (defaultInfoUser &&
          defaultInfoUser.email)) &&
        <>
          <Form.Label>E-mail{onlyShowInfo && defaultInfoUser && !defaultInfoUser.isActivated ? <span className={'text-red-600'}> Не подтверждён!</span> : ''}</Form.Label>
        <InputGroup hasValidation className="mb-2">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            required
            onChange={handleChangeInput}
            name={'email'}
            isValid={!errors.email && !onlyShowInfo}
            isInvalid={!!errors.email}
            disabled={onlyShowInfo}
            placeholder="Введите E-mail"
            value={formState.email}
            // defaultValue={defaultInfoUser &&
            //               defaultInfoUser.email
            //   ? defaultInfoUser.email
            //   : ''}
            aria-label="email"
            aria-describedby="basic-addon1"
          />
           {/* <Form.Control.Feedback>Отлично!</Form.Control.Feedback> */}
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
        </InputGroup>
        </>
        }

        {showEditPass && !onlyShowInfo &&
         <>
        <Form.Label>Пароль</Form.Label>
        <InputGroup hasValidation className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-pass"/>
          </InputGroup.Text>
          <Form.Control
            required
            onChange={handleChangeInput}
            className={'pr-[4.5rem] md'}
            type={showPass ? 'text' : 'password'}
            value={formState.password}
            // defaultValue={''}
            isValid={!errors.password}
            isInvalid={!!errors.password}
            disabled={onlyShowInfo}
            placeholder={changeProfile ? 'Введите новый пароль' : 'Введите пароль'}
            name={'password'}
          />
          <Button className={'bg-emerald-600'}
                  onClick={handleClick}>
            {showPass ? 'Скрыть' : 'Показать'}
          </Button>
          {/* <Form.Control.Feedback>Отлично!</Form.Control.Feedback> */}
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
        </InputGroup>
         </>
        }

        {showEditPass && !onlyShowInfo && formState.password &&
            <>
              <Form.Label>Подтвердите пароль</Form.Label>
              <InputGroup hasValidation className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <i className="bi bi-pass"/>
                </InputGroup.Text>
                <Form.Control
                  required
                  onChange={handleChangeInput}
                  className={'pr-[4.5rem] md'}
                  type={showPass ? 'text' : 'password'}
                  value={formState.rePassword}
                  // defaultValue={''}
                  isValid={!errors.rePassword}
                  isInvalid={!!errors.rePassword}
                  disabled={onlyShowInfo}
                  placeholder={'Введите пароль ещё раз'}
                  name={'rePassword'}
                />
                <Button className={'bg-emerald-600'}
                        onClick={handleClick}>
                  {showPass ? 'Скрыть' : 'Показать'}
                </Button>
                {/* <Form.Control.Feedback>Отлично!</Form.Control.Feedback> */}
                <Form.Control.Feedback type="invalid">
                  {errors.rePassword}
                </Form.Control.Feedback>
              </InputGroup>
            </>
        }

        {(onlyShowInfo ||
            (defaultInfoUser && changeProfile &&
             defaultInfoUser.rolesId && isAdmin)) &&
        <>
          <Form.Label>Группа</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text id="basic-addon1">
              <i className="bi bi-people-fill"/>
            </InputGroup.Text>
          <Form.Select
            disabled={onlyShowInfo}
            name={'rolesId'}
            onChange={(event) => confirmRoles(event,
              defaultInfoUser &&
                      defaultInfoUser.rolesId
                ? defaultInfoUser.rolesId
                : 3)}
            defaultValue={defaultInfoUser &&
                          defaultInfoUser.rolesId
              ? defaultInfoUser.rolesId
              : 3}
          >
            <option value={3}>Пользователь</option>
            <option value={2}>Модератор</option>
            <option value={1}>Админ</option>
          </Form.Select>
          </InputGroup>
        </>
        }

        {(!onlyShowInfo ||
         (defaultInfoUser &&
          defaultInfoUser.fullName)) &&
         <>
        <Form.Label>ФИО</Form.Label>
        <InputGroup hasValidation className="mb-2">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-file-person"/>
          </InputGroup.Text>
          <Form.Control
            onChange={handleChangeInput}
            name={'fullName'}
            disabled={onlyShowInfo}
            placeholder="Введите ФИО"
            isValid={!errors.fullName && !onlyShowInfo}
            isInvalid={!!errors.fullName}
            value={formState.fullName}
            // defaultValue={defaultInfoUser &&
            //               defaultInfoUser.fullName
            //   ? defaultInfoUser.fullName
            //   : ''}
            aria-label="fullName"
            aria-describedby="basic-addon1"
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName}
          </Form.Control.Feedback>
        </InputGroup>
        </>
        }

        {(!onlyShowInfo ||
          (defaultInfoUser &&
           defaultInfoUser.city)) &&
         <>
        <Form.Label>Город</Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-bank"/>
          </InputGroup.Text>
          <Form.Control
            onChange={handleChangeInput}
            name={'city'}
            placeholder="Введите Город"
            aria-label="city"
            disabled={onlyShowInfo}
            value={formState.city}
            // defaultValue={defaultInfoUser &&
            //               defaultInfoUser.city
            //   ? defaultInfoUser.city
            //   : ''}
            aria-describedby="basic-addon1"
          />
        </InputGroup>
         </>
        }

        {(!onlyShowInfo ||
          (defaultInfoUser &&
           defaultInfoUser.address)) &&
        <>
        <Form.Label>Адрес</Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-house" />
          </InputGroup.Text>
          <Form.Control
            onChange={handleChangeInput}
            name={'address'}
            disabled={onlyShowInfo}
            placeholder="Введите Адрес"
            aria-label="address"
            value={formState.address}
            // defaultValue={defaultInfoUser &&
            //               defaultInfoUser.address
            //   ? defaultInfoUser.address
            //   : ''}
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        </>
        }

        {(!onlyShowInfo || (defaultInfoUser &&
         defaultInfoUser.deliveryAddress)) &&
         <>
        <Form.Label>Адрес доставки</Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-truck"/>
          </InputGroup.Text>
          <Form.Control
            onChange={handleChangeInput}
            name={'deliveryAddress'}
            disabled={onlyShowInfo}
            placeholder="Введите Адрес доставки"
            value={formState.deliveryAddress}
            // defaultValue={defaultInfoUser &&
            //               defaultInfoUser.deliveryAddress
            //   ? defaultInfoUser.deliveryAddress
            //   : ''}
            aria-label="deliveryAddress"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
         </>
        }
        {(!onlyShowInfo ||
          (defaultInfoUser &&
           defaultInfoUser.phoneNumber)) &&
        <>
        <Form.Label>Номер телефона</Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-telephone"/>
          </InputGroup.Text>
          <Form.Control
            onChange={handleChangeInput}
            name={'phoneNumber'}
            disabled={onlyShowInfo}
            placeholder="Введите Номер телефона"
            value={formState.phoneNumber}
            // defaultValue={defaultInfoUser &&
            //               defaultInfoUser.phoneNumber
            //   ? defaultInfoUser.phoneNumber
            //   : ''}
            aria-label="phoneNumber"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        </>
        }
        {showEditAvatar && !onlyShowInfo &&
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
          {showDelAvatar &&
           !onlyShowInfo &&
           showEditAvatar &&
           changeProfile &&
          <Form.Group className="mb-3">
            <Form.Check
              onChange={handleChangeCheckbox}
              name={'delAvatar'}
              label="Удалить аватар?"
            />
          </Form.Group>
          }
          {!onlyShowInfo &&
          <Form.Group className="mb-3">
          <Form.Check
            onChange={handleChangeCheckbox}
            name={'isSubscribeToNews'}
            checked={formState.isSubscribeToNews}
            // defaultChecked={defaultInfoUser &&
            //                 defaultInfoUser.isSubscribeToNews === 1}
            label="Получать новости магазина"
          />
         </Form.Group>
          }
        </Form>
      </div>
      {!onlyShowInfo &&
      <Button variant="success"
              className={'bg-emerald-600 w-full'}
              onClick={btnLogin}
              type={'submit'}
      >
        {changeProfile
          ? 'Сохранить изменения'
          : 'Создать аккаунт'
        }
      </Button>
      }
      {onShowLogin && !onlyShowInfo && onCloseReg &&
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
        variant="success"
        className={'bg-emerald-600 w-full'}>
        Войдите!
      </Button>
       </>
      }
    </div>
  )
}

export default Registration
