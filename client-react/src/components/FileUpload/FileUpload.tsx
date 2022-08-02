import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import Form from 'react-bootstrap/Form'

interface IFileUploadProps {
  limit: number;
  multiple: boolean;
  name: string;
}

const FileUpload: React.FC<IFileUploadProps> = ({ limit, multiple, name }) => {
  // 👇 Form Context
  const {
    control,
    formState: { isSubmitting, errors }
  } = useFormContext()

  // 👇 State with useState()
  const { field } = useController({ name, control })
  const [singleFile, setSingleFile] = useState<File[]>([])
  const [fileList, setFileList] = useState<File[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  // 👇 Toggle the dragover class
  const onDragEnter = () => wrapperRef.current?.classList.add('dragover')
  const onDragLeave = () => wrapperRef.current?.classList.remove('dragover')

  // 👇 Image Upload Service
  const onFileDrop = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      const target = e.target as HTMLInputElement
      if (!target.files) return

      if (limit === 1) {
        const newFile = Object.values(target.files).map((file: File) => file)
        if (singleFile.length >= 1) return alert('Разрешено только одно изображение')
        setSingleFile(newFile)
        field.onChange(newFile[0])
      }

      if (multiple) {
        const newFiles = Object.values(target.files).map((file: File) => file)
        if (newFiles) {
          const updatedList = [...fileList, ...newFiles]
          if (updatedList.length > limit || newFiles.length > 3) {
            return alert(`Изображений не должно быть больше, чем ${limit}`)
          }
          setFileList(updatedList)
          field.onChange(updatedList)
        }
      }
    },
    [field, fileList, limit, multiple, singleFile]
  )

  // 👇 Reset the State
  useEffect(() => {
    if (isSubmitting) {
      setFileList([])
      setSingleFile([])
    }
  }, [isSubmitting])

  // 👇 Actual JSX
  return (
    <>
      <div ref={wrapperRef}
           onDragEnter={onDragEnter}
           onDragLeave={onDragLeave}
           onDrop={onDragLeave}>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>{name}</Form.Label>
        {limit > 1
          ? <Form.Control name={name} onChange={onFileDrop} type="file" multiple size="sm" />
          : <Form.Control name={name} onChange={onFileDrop} type="file" size="sm" />
        }
      </Form.Group>
        {errors[name] && <div>errors[name].message</div>}
      </div>
    </>
  )
}

export default FileUpload
