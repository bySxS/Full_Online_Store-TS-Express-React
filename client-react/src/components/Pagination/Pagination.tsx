import React, { FC, useMemo } from 'react'
import { Button } from 'react-bootstrap'
import style from './Pagination.module.scss'

interface IPagination {
  totalPage: number
  page: number
  onChangePage: (currPage: number) => void
  className?: string
}

const getPageArray = (totalPage: number) => {
  const result: number[] = []
  for (let i = 0; i < totalPage; i++) {
    result.push(i + 1)
  }
  return useMemo(() => result, [totalPage])
}

const Pagination: FC<IPagination> = ({
  onChangePage, totalPage, page, className
}) => {
  const pagesArray = getPageArray(totalPage)
  return (
    <div className={style.blockPages}>
      {pagesArray.map(p => (
        <Button
          key={p}
          variant={'outline-warning'}
          onClick={() => onChangePage(p)}
          disabled={(page === p)}
          className={`${style.button} ${page === p ? style.buttonActive : ''} ${className || ''}`}
        >
          {p}
        </Button>
      ))}
    </div>
  )
}

export default Pagination
