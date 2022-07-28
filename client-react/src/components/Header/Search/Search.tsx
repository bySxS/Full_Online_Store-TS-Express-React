import React, { useRef, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useDebounce } from 'hooks/useDebounce'
import { useSearchProductsQuery } from 'store/myStore/myStore.api'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'AppRouter'
import { useInfoLoading } from 'hooks/useInfoLoading'
import style from './Search.module.scss'

const Search = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const debounced = useDebounce(search)
  const refInput = useRef<HTMLInputElement>(null)
  const { isLoading, isError, isSuccess, data: products, error } =
    useSearchProductsQuery({ value: debounced, limit: 50, page: 1 }, {
      skip: debounced.length < 3,
      refetchOnFocus: true
    })
  useInfoLoading({ isLoading, isSuccess, isError, data: products, error })

  const inputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setSearch(e.target.value)
  }
  // const btnSearch = (e: any) => {
  //   e.stopPropagation()
  //   if (refInput) {
  //     const text = refInput.current?.value
  //     setSearch(text + ' ' || '')
  //   }
  // }
  const searchSubmitHandler = (e: any) => {
    e.preventDefault()
    if (refInput) {
      const text = refInput.current?.value
      setSearch(text + ' ' || '')
    }
  }
  const clickLiHandler = (id: number) => {
    setSearch('')
    const path = `${RoutePath.PRODUCTS}/${id}`
    navigate(path)
  }

  return (
    <div>
      <InputGroup className="justify-content-center">
        <InputGroup.Text id="basic-addon1">
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <Form className="d-flex w-[300px]"
              onSubmit={searchSubmitHandler}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          value={search}
          onChange={inputSearch}
          aria-label="Search"
          ref={refInput}
        />
        {/* <Button variant="outline-success" */}
        {/*        onClick={btnSearch}> */}
        {/*  Search */}
        {/* </Button> */}
      </Form>
    </InputGroup>
      <div className={`${style.result_search} min-w-[360px] max-w-full`}>
      <ul className={'list-none position-absolute top-[15px] left-0 right-0 max-h-[200px] overflow-y-auto shadow-md bg-white'}>
        {isSuccess && products?.result?.results.map(product => (
          <li key={product.id}
              className={`py-1 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer ${style.li_item}`}
              onClick={() => clickLiHandler(product.id)}
          >
            { product.title }
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default Search
