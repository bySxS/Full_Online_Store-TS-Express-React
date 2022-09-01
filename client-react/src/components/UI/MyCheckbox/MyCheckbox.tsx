import React, { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { Form } from 'react-bootstrap'

interface IMyCheckbox {
  label: string | ReactNode
  name: string
  value?: boolean
  setValue?: Dispatch<SetStateAction<any>>
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const MyCheckbox: FC<IMyCheckbox> = ({
  label,
  setValue,
  onChange,
  name,
  value
}) => {
  const handleChangeCheckbox =
    ({ target: { name, checked } }: React.ChangeEvent<HTMLInputElement>) => {
      if (setValue) {
        setValue((prev: any) => ({ ...prev, [name]: checked }))
      }
    }
  return (
    <Form.Group className="mb-2">
      <Form.Check
        onChange={onChange || handleChangeCheckbox}
        name={name}
        checked={value}
        label={label}
      />
    </Form.Group>
  )
}

export default MyCheckbox
