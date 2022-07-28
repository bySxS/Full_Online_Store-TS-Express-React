import React, { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { ILoginIn } from 'store/myStore/myStore.interface'
import { InputGroup, Form, Button } from 'react-bootstrap'
import { useLoginMutation } from 'store/myStore/myStore.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useAppActions, useAppDispatch } from 'hooks/useStore'
import { useNavigate } from 'react-router-dom'

interface LoginRegProps {
  name: string
}

const LoginReg: FC<LoginRegProps> = ({ name }) => {
  const navigate = useNavigate()
  const [login, { isLoading, isSuccess, isError, data: user, error }] = useLoginMutation()
  useInfoLoading({ isLoading, isSuccess, isError, data: user, error })
  const dispatch = useAppDispatch()
  const { addToken } = useAppActions()
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
      dispatch(addToken(user.result))
      navigate('/')
    }
  }, [isSuccess])

  const handleClick = () => setShow(!show)

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }))

  return (
    <div>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <div className="font-bold">{name}</div>
      <div>
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
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
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
        <Button variant="primary" className={'bg-emerald-600'} onClick={btnLogin}>Login</Button>
      </div>
    </div>
  )
}

export default LoginReg
