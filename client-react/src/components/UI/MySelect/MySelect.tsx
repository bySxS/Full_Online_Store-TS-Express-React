import React, { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { Form, InputGroup } from 'react-bootstrap'

interface IValuesOption {
  value: string | number
  name: string
}

interface IMySelect {
  label?: string | ReactNode
  name: string
  valuesOption: IValuesOption[]
  icon?: ReactNode
  disable?: boolean
  setValue?: Dispatch<SetStateAction<any>>
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  defaultValue?: string | number
}

const MySelect: FC<IMySelect> = ({
  name,
  label,
  disable,
  setValue,
  onChange,
  valuesOption,
  icon,
  defaultValue
}) => {
  const handleChangeSelect =
    ({ target: { name, value }, currentTarget }: React.ChangeEvent<HTMLSelectElement>) => {
      if (setValue) {
        setValue((prev: any) => ({ ...prev, [name]: value }
        ))
      }
      currentTarget.checkValidity()
    }
  return (
      <>
        {label && <Form.Label>{label}</Form.Label>}
        <InputGroup className="mb-2">
          {icon &&
            <InputGroup.Text id="basic-addon1">
              {icon}
            </InputGroup.Text>
          }
          <Form.Select
            disabled={disable}
            name={name}
            onChange={onChange || handleChangeSelect}
            defaultValue={defaultValue || valuesOption[0].value}
          >
            {valuesOption.map(item =>
            <option
              key={item.value}
              value={item.value}
            >
              {item.name}
            </option>
            )}
          </Form.Select>
        </InputGroup>
      </>
  )
}

export default MySelect
