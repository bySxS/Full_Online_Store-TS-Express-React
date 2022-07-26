import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDebounce } from 'hooks/useDebounce'
import { useSearchProductsQuery } from 'store/api/myStoreApi'
import Alarm from 'components/UI/Alarm/Alarm'
import Loader from 'components/UI/Loader/Loader'
import { IMessage } from 'store/api/myStoreApi.interface'

const Search = () => {
  const [search, setSearch] = useState('')
  const [errorStr, setErrorStr] = useState('')
  const debounced = useDebounce(search)
  const refInput = useRef<HTMLInputElement>(null)
  const { isLoading, isError, isSuccess, data, error } =
    useSearchProductsQuery({ value: debounced, limit: 10, page: 1 }, {
      skip: debounced.length < 3
    })
  useEffect(() => {
    console.log(search)
  }, [search])

  useEffect(() => {
    if ((isError) && (error && 'status' in error)) {
      const err = error.data as IMessage<string>
      setErrorStr(err.message)
    }
  }, [isError])

  const inputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setSearch(e.target.value)
  }

  const btnSearch = (e: any) => {
    if (refInput) {
      setSearch(refInput.current?.value + ' ' || '')
    }
    e.stopPropagation()
  }
  const submitHandler = (e: any) => {
    if (refInput) {
      setSearch(refInput.current?.value + ' ' || '')
    }
    e.preventDefault()
  }

  return (
    <div>
      <Form className="d-flex" onSubmit={submitHandler}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          value={search}
          onChange={inputSearch}
          aria-label="Search"
          ref={refInput}
        />
        <Button variant="outline-success"
                onClick={btnSearch}
                onKeyDown={btnSearch}>
          Search
        </Button>
      </Form>
      <ul className={'list-none position-absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white'}>

      </ul>
      {isLoading && <Loader/>}
      {errorStr && <Alarm title={'Ошибка'} status={'error'} message={errorStr}/>}
      {isSuccess && <Alarm title={'Успех'} message={data.message}/>}
    </div>
  )
}

export default Search
