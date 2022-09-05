import React, { Dispatch, FC, SetStateAction, useMemo } from 'react'
import { Button } from 'react-bootstrap'
import style from './Pagination.module.scss'

interface IPagination {
  totalPage: number
  page: number
  onChangePage?: (currPage: number) => void
  setPage?: Dispatch<SetStateAction<number>>
  setQueryPage?: (nextInit: { page: string }, navigateOptions?: {replace?: boolean | undefined, state?: any} | undefined) => void
  widthClassName?: string
}

const getPageArray = (totalPage: number) => {
  const result: number[] = []
  for (let i = 0; i < totalPage; i++) {
    result.push(i + 1)
  }
  return useMemo(() => result, [totalPage])
}

const Pagination: FC<IPagination> = ({
  onChangePage,
  setPage,
  totalPage,
  page,
  widthClassName,
  setQueryPage
}) => {
  const pagesArray = getPageArray(totalPage)
  const changePage = (currPage: number) => {
    if (setPage) {
      setPage(currPage)
    }
    if (setQueryPage) {
      setQueryPage({ page: String(currPage) }, {
        replace: true
      })
    }
  }
  return (
    <div className={`${style.blockPagination} ${widthClassName || 'w-full'}`}>
    <div className={style.blockPages}>
      {pagesArray.map(p => (
        <Button
          key={p}
          variant={'outline-warning'}
          onClick={() => onChangePage ? onChangePage(p) : changePage(p) }
          disabled={(page === p)}
          className={`${style.button} ${page === p ? style.buttonActive : ''}`}
        >
          {p}
        </Button>
      ))}
    </div>
    </div>
  )
}

export default Pagination
