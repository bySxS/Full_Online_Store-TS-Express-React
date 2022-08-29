import React, { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

interface MyInputProps {
  label?: string | ReactNode
  placeholder: string
  value: string | undefined
  setValue?: Dispatch<SetStateAction<any>>
  nameInput: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  icon: ReactNode
  isValid?: boolean
  addButtonHide?: boolean
  disable?: boolean
  textError?: string
  type?: 'input' | 'textarea'
  // validate?: boolean
}

const MyInput: FC<MyInputProps> = ({
  label,
  placeholder,
  value,
  setValue,
  nameInput,
  onChange,
  icon,
  addButtonHide = false,
  disable = false,
  textError,
  isValid,
  type = 'input'
  // validate = false
}) => {
  const [showText, setShowText] = useState(true)

  const handleChangeInput =
    ({ target: { name, value }, currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
      if (setValue) {
        setValue((prev: any) => ({ ...prev, [name]: value }
        ))
      }
      currentTarget.checkValidity()
    }

  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <InputGroup
        hasValidation={!!textError}
        className={'mb-2'}
      >
        <InputGroup.Text id="basic-addon1">
          {icon}
        </InputGroup.Text>
        <Form.Control
          required
          as={type}
          onChange={onChange || handleChangeInput}
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
          style={type === 'textarea' ? { height: '130px' } : {}}
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
