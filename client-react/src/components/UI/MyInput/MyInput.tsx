import React, { FC, ReactNode, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

interface MyInputProps {
  label: any
  value: string
  nameInput: string
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  icon: ReactNode
  isValid: boolean
  addButtonHide?: boolean
  disable?: boolean
  textError?: string
  // validate?: boolean
}

const MyInput: FC<MyInputProps> = ({
  label,
  value,
  nameInput,
  placeholder,
  onChange,
  icon,
  addButtonHide = false,
  disable = false,
  textError,
  isValid
  // validate = false
}) => {
  const [showText, setShowText] = useState(true)
  return (
    <>
      <Form.Label>{label}</Form.Label>
      <InputGroup hasValidation={false} className={`mb-${addButtonHide ? '3' : '2'}`}>
        <InputGroup.Text id="basic-addon1">
          {icon}
        </InputGroup.Text>
        <Form.Control
          required
          onChange={onChange}
          className={'pr-[4.5rem] md'}
          type={showText ? 'text' : 'password'}
          value={value}
          isValid={isValid}
          isInvalid={!!textError}
          disabled={disable}
          placeholder={placeholder}
          name={nameInput}
          aria-label={nameInput}
          aria-describedby="basic-addon1"
        />
        {addButtonHide &&
          <Button className={'bg-emerald-600'}
                onClick={() => setShowText(!showText)}>
          {showText ? 'Скрыть' : 'Показать'}
        </Button>
        }
        {textError &&
          <Form.Control.Feedback type="invalid">
          {textError}
        </Form.Control.Feedback>
        }
      </InputGroup>
    </>
  )
}

export default MyInput
