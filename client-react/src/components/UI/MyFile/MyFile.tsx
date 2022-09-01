import React, { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { Form } from 'react-bootstrap'

interface IMyFile {
  label?: string | ReactNode
  name: string
  setValue?: Dispatch<SetStateAction<any>>
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const MyFile: FC<IMyFile> = ({
  label,
  name,
  setValue,
  onChange
}) => {
  const handleChangeFile =
    ({ target: { name, files } }: React.ChangeEvent<HTMLInputElement>) => {
      if (setValue) {
        setValue((prev: any) => ({ ...prev, [name]: files ? files[0] : null }))
      }
    }
  return (
    <Form.Group controlId="formFileMultiple"
                className="mb-2">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        onChange={onChange || handleChangeFile}
        name={name}
        type="file"
        size="sm" />
    </Form.Group>
  )
}

export default MyFile
