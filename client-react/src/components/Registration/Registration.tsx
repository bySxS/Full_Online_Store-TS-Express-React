import React, { FC, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import {
  useRegistrationMutation,
  useUpdateUserByIdMutation
} from 'store/myStore/myStoreUser.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { IRegistrationIn, IUsers } from 'store/myStore/myStoreUser.interface'
import { useAuth } from 'hooks/useSelectors'
import { useDebounce } from 'hooks/useDebounce'
import { validateUser } from 'utils/validator'
import MyCheckbox from 'components/UI/MyCheckbox/MyCheckbox'
import MyInput from 'components/UI/MyInput/MyInput'
import MySelect from 'components/UI/MySelect/MySelect'
import MyFile from '../UI/MyFile/MyFile'

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
    password: '',
    rePassword: '',
    rolesId: (defaultInfoUser && defaultInfoUser.rolesId ? defaultInfoUser.rolesId : 3),
    email: (defaultInfoUser && defaultInfoUser.email ? defaultInfoUser.email : ''),
    fullName: (defaultInfoUser && defaultInfoUser.fullName ? defaultInfoUser.fullName : ''),
    city: (defaultInfoUser && defaultInfoUser.city ? defaultInfoUser.city : ''),
    address: (defaultInfoUser && defaultInfoUser.address ? defaultInfoUser.address : ''),
    deliveryAddress: (defaultInfoUser && defaultInfoUser.deliveryAddress ? defaultInfoUser.deliveryAddress : ''),
    phoneNumber: (defaultInfoUser && defaultInfoUser.phoneNumber ? defaultInfoUser.phoneNumber : ''),
    isSubscribeToNews: (defaultInfoUser && defaultInfoUser.isSubscribeToNews ? (defaultInfoUser.isSubscribeToNews === 1) : false),
    delAvatar: false
  })
  const formStateDebounce = useDebounce(formState)
  const { isAdmin, nickname } = useAuth()
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    rePassword?: string
    nickname?: string
    fullName?: string
  }>({})

  const btnLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!validated && !isAdmin) {
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
      const result = validateUser({
        email: formState.email,
        nickname: formState.nickname,
        fullName: formState.fullName,
        password: showEditPass ? formState.password : undefined,
        rePassword: showEditPass ? formState.rePassword : undefined
      })
      setValidated(result.success)
      setErrors(result.errors)
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
          <MyInput
            nameInput={'nickname'}
            value={formState.nickname}
            placeholder={'Введите ник'}
            label={'Никнейм'}
            icon={<i className="bi bi-person"/>}
            setValue={setFormState}
            disable={onlyShowInfo}
            textError={!onlyShowInfo ? errors.nickname : ''}
            isValid={!errors.nickname && !onlyShowInfo}
          />
        }

        {(!onlyShowInfo ||
         (defaultInfoUser &&
          defaultInfoUser.email)) &&
          <MyInput
            nameInput={'email'}
            value={formState.email}
            placeholder={'Введите E-mail'}
            label={<span>E-mail{onlyShowInfo &&
            defaultInfoUser &&
            !defaultInfoUser.isActivated
              ? <span className={'text-red-700'}> (не подтверждён)</span>
              : <span className={'text-green-700'}> (подтверждён)</span>}</span>}
            icon={'@'}
            setValue={setFormState}
            disable={onlyShowInfo}
            textError={!onlyShowInfo ? errors.email : ''}
            isValid={!errors.email && !onlyShowInfo}
          />
        }

        {showEditPass && !onlyShowInfo &&
        <MyInput
          label={'Пароль'}
          value={formState.password}
          disable={onlyShowInfo}
          nameInput={'password'}
          placeholder={changeProfile
            ? 'Введите новый пароль'
            : 'Введите пароль'}
          setValue={setFormState}
          icon={<i className="bi bi-pass"/>}
          isValid={!errors.password}
          textError={!onlyShowInfo ? errors.password : ''}
          addButtonHide={true}
        />
        }

        {showEditPass && !onlyShowInfo && formState.password &&
              <MyInput
                label={'Подтвердите пароль'}
                value={formState.rePassword}
                nameInput={'rePassword'}
                placeholder={'Введите пароль ещё раз'}
                disable={onlyShowInfo}
                setValue={setFormState}
                icon={<i className="bi bi-pass"/>}
                isValid={!errors.rePassword}
                textError={!onlyShowInfo ? errors.rePassword : ''}
                addButtonHide={true}
              />
        }

        {(onlyShowInfo ||
            (defaultInfoUser && changeProfile &&
             defaultInfoUser.rolesId && isAdmin)) &&
        <>
          <MySelect
            name={'rolesId'}
            disable={onlyShowInfo}
            icon={<i className="bi bi-people-fill"/>}
            label={'Группа'}
            onChange={(event) => confirmRoles(event,
              defaultInfoUser &&
              defaultInfoUser.rolesId
                ? defaultInfoUser.rolesId
                : 3)}
            valuesOption={[
              { value: 3, name: 'Пользователь' },
              { value: 2, name: 'Модератор' },
              { value: 1, name: 'Админ' }
            ]}
            defaultValue={defaultInfoUser &&
            defaultInfoUser.rolesId
              ? defaultInfoUser.rolesId
              : 3}
          />
        </>
        }

        {(!onlyShowInfo ||
         (defaultInfoUser &&
          defaultInfoUser.fullName)) &&
           <MyInput
             label={'ФИО'}
             value={formState.fullName}
             nameInput={'fullName'}
             placeholder={'Введите ФИО'}
             setValue={setFormState}
             disable={onlyShowInfo}
             icon={<i className="bi bi-file-person"/>}
             isValid={!errors.fullName && !onlyShowInfo}
             textError={!onlyShowInfo ? errors.fullName : ''}
           />
        }

        {(!onlyShowInfo ||
          (defaultInfoUser &&
           defaultInfoUser.city)) &&
           <MyInput
             label={'Город'}
             value={formState.city}
             nameInput={'city'}
             disable={onlyShowInfo}
             placeholder={'Введите Город'}
             setValue={setFormState}
             icon={<i className="bi bi-bank"/>}
           />
        }

        {(!onlyShowInfo ||
          (defaultInfoUser &&
           defaultInfoUser.address)) &&
          <MyInput
            label={'Адрес'}
            value={formState.address}
            nameInput={'address'}
            disable={onlyShowInfo}
            placeholder={'Введите Адрес'}
            setValue={setFormState}
            icon={<i className="bi bi-house" />}
          />
        }

        {(!onlyShowInfo || (defaultInfoUser &&
         defaultInfoUser.deliveryAddress)) &&
           <MyInput
             label={'Адрес доставки'}
             value={formState.deliveryAddress}
             nameInput={'deliveryAddress'}
             disable={onlyShowInfo}
             placeholder={'Введите Адрес доставки'}
             setValue={setFormState}
             icon={<i className="bi bi-truck"/>}
           />
        }
        {(!onlyShowInfo ||
          (defaultInfoUser &&
           defaultInfoUser.phoneNumber)) &&
          <MyInput
            label={'Номер телефона'}
            value={formState.phoneNumber}
            nameInput={'phoneNumber'}
            disable={onlyShowInfo}
            placeholder={'Введите Номер телефона'}
            setValue={setFormState}
            icon={<i className="bi bi-telephone"/>}
          />
        }
        {showEditAvatar && !onlyShowInfo &&
          <MyFile
            name={'avatar'}
            label={'Аватар'}
            setValue={setFormState}
          />
         }
          {showDelAvatar &&
           !onlyShowInfo &&
           showEditAvatar &&
           changeProfile &&
            <MyCheckbox
            label={'Удалить аватар?'}
            name={'delAvatar'}
            value={formState.delAvatar}
            setValue={setFormState}
            />
          }
          {!onlyShowInfo &&
            <MyCheckbox
              label={'Получать новости магазина'}
              name={'isSubscribeToNews'}
              value={formState.isSubscribeToNews}
              setValue={setFormState}
            />
          }
        </Form>
      </div>
      {!onlyShowInfo &&
      <Button variant="success"
              className={'bg-emerald-600 w-full'}
              onClick={btnLogin}
              type={'submit'}
              disabled={!validated && !isAdmin}
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
