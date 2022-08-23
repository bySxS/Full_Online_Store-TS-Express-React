import React, { useEffect, useRef, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useDebounce } from 'hooks/useDebounce'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'AppRouter'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import { addDomainToImgProducts } from 'utils'
import { ICategorySearch } from 'store/myStore/myStoreCategory.interface'
import style from './Search.module.scss'
import { useSearchCategoryQuery } from 'store/myStore/myStoreCategory.api'
import { useSearchProductsQuery } from 'store/myStore/myStoreProduct.api'

const Search = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<IProduct[]>()
  const [category, setCategory] = useState<ICategorySearch[]>()
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const debounced = useDebounce(search)
  const refInput = useRef<HTMLInputElement>(null)
  const {
    isLoading,
    isError,
    isSuccess,
    data: searchProducts,
    error
  } = useSearchProductsQuery({ value: debounced, limit: 50, page: 1 }, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })
  useInfoLoading({
    isLoading,
    isSuccess,
    isError,
    data: searchProducts,
    error
  })
  const {
    data: searchCategory,
    isLoading: isLoadingCat,
    isError: isErrorCat,
    isSuccess: isSuccessCat,
    error: errorCat
  } = useSearchCategoryQuery({ value: debounced, limit: 50, page: 1 }, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })
  useInfoLoading({
    data: searchCategory,
    isLoading: isLoadingCat,
    isError: isErrorCat,
    isSuccess: isSuccessCat,
    error: errorCat
  })

  useEffect(() => {
    if (debounced.length < 3) {
      setProducts([])
      setCategory([])
    } else {
      if (isSuccess) {
        setProducts(
          addDomainToImgProducts(
            searchProducts.result?.results as IProduct[]
          )
        )
      }
      if (isSuccessCat) {
        setCategory(searchCategory.result?.results as ICategorySearch[])
      }
    }
  }, [searchProducts, searchCategory, debounced])

  const inputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setSearch(e.target.value.trim())
    setSearchInput(e.target.value)
  }

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (refInput) {
      const text = refInput.current?.value
      setSearch(text?.trim() || '')
      setSearchInput(text || '')
    }
  }
  const clickLiProductHandler = (id: number) => {
    setSearch('')
    const path = `${RoutePath.PRODUCTS}/${id}`
    navigate(path)
    setProducts([])
    setCategory([])
  }

  const clickLiCategoryHandler = (id: number) => {
    setSearch('')
    const path = `${RoutePath.PRODUCTS}/category/${id}`
    navigate(path)
    setProducts([])
    setCategory([])
  }

  return (
    <div>
      <InputGroup className="justify-content-center">
        <InputGroup.Text id="basic-addon1">
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <Form className={style.searchForm}
              onSubmit={searchSubmitHandler}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          value={searchInput}
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
      {((products && products?.length > 0) || (category && category?.length > 0)) &&
        <div className={`${style.resultSearch}`}>
      <ul className={style.ul}>
        {products && products.map(product => (
          <li key={product.id}
              className={style.li}
              onClick={() => clickLiProductHandler(product.id)}
          >
            {product.screen &&
            <img src={product.screen}
                 alt={product.title}
                 className={style.screen}/>
            } {product.title}
          </li>
        ))}
        {category && category.map(cat => (
          <li key={cat.categoryNameEng}
              className={style.li}
              onClick={() => clickLiCategoryHandler(cat.id)}
          >
            {cat.categoryIconClass &&
             <i className={`${cat.categoryIconClass} ${style.screen}`}/>
            } {cat.categoryName}
          </li>
        ))}
      </ul>
      </div>
      }
    </div>
  )
}

export default Search
