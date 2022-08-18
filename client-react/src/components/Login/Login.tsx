import React, { FC, useEffect, useState } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'
import { useLoginMutation } from 'store/myStore/myStoreUser.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
// import { useNavigate } from 'react-router-dom'
import { ILoginIn } from 'store/myStore/myStoreUser.interface'
// import { RoutePath } from 'AppRouter'

interface ILoginProps {
  onCloseLogin: () => void
  onShowReg: () => void
}

const Login: FC<ILoginProps> = ({ onCloseLogin, onShowReg }) => {
  // const navigate = useNavigate()
  const [login, { isLoading, isSuccess, isError, data: user, error }] = useLoginMutation()
  useInfoLoading({ isLoading, isSuccess, isError, data: user, error })

  const [formState, setFormState] = React.useState<ILoginIn>({
    nickname: '',
    password: ''
  })
  const [show, setShow] = useState(false)

  const btnLogin = (e: any) => {
    e.stopPropagation()
    login(formState)
  }

  useEffect(() => {
    if (isSuccess && user) {
      // navigate('/')
      onCloseLogin()
    }
  }, [isSuccess])

  const handleClick = () => setShow(!show)

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }))

  return (
  <div>
        <div className={'text-left'}>
        <Form.Label>Никнейм</Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            onChange={handleChange}
            name={'nickname'}
            placeholder="nickname"
            aria-label="nickname"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Form.Label>Пароль</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <i className="bi bi-pass"/>
          </InputGroup.Text>
          <Form.Control
            onChange={handleChange}
            className={'pr-[4.5rem] md'}
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
            name={'password'} />
          <Button className={'bg-emerald-600'} onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputGroup>
        </div>
        <Button variant="primary"
                className={'bg-emerald-600 w-full'}
                onClick={btnLogin}>
          Войти
        </Button>
        <div className={'legend'}>
         <hr className={'flex-auto'}/>
          <div className={'flex-1'}>Нет аккаунта?</div>
         <hr className={'flex-auto'}/>
        </div>
        {/* <NavLink to={RoutePath.REGISTRATION}> */}
          <Button
            onClick={() => {
              onShowReg()
              onCloseLogin()
            }}
            variant="primary"
            className={'bg-emerald-600 w-full'}>
            Зарегистрируйся!
          </Button>
        {/* </NavLink> */}
  </div>
  )
}

export default Login
