import React, {
  FC, useEffect, useRef, useState
} from 'react'
import { useObserver } from 'hooks/useObserver'
import { useAppSelector } from 'hooks/useStore'
import selectProduct from 'store/product/product.selector'
import style from './AutoPagination.module.scss'

interface IAutoPaginationProps {
  limit: number
  isLoading: boolean
  clearItems?: () => void
  getItems: () => void
}

const AutoPagination: FC<IAutoPaginationProps> = ({
  limit,
  isLoading,
  getItems
}) => {
  const pagination = useRef<HTMLHeadingElement>(null)
  
  

  

  

  return (
    <>
      <div ref={pagination}
           className={style.autoPagination}/>
    </>
  )
}

export default AutoPagination
