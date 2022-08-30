import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'AppRouter'
import { useModal } from 'context/ModalContext'
import { useDebounce } from 'hooks/useDebounce'
import style from './ProductItemBasket.module.scss'

export interface IProductItemSmall {
  productId: number
  productTitle: string
  productScreen: string
  productCount: number
}

export interface IProductItemSmallProps {
  productId: number
  productTitle: string
  productScreen: string
  productCount: number
  InBasket?: boolean
  onDelete: (id: number, title: string) => void
  onChangeCount?: (productId: number, productCount: number) => void
}

const ProductItemBasket: FC<IProductItemSmallProps> = ({
  productScreen,
  productId,
  productTitle,
  onDelete,
  onChangeCount,
  InBasket = false,
  productCount
}) => {
  const [count, setCount] = useState(productCount)
  const countDelay = useDebounce(count, 1000)
  const navigate = useNavigate()
  const { closeModal } = useModal()
  const clickToProduct = () => {
    navigate(RoutePath.PRODUCTS + '/' + productId)
    closeModal(0)
  }

  useEffect(() => {
    if (countDelay > 0 && countDelay !== productCount && onChangeCount) {
      onChangeCount(productId, countDelay)
    }
  }, [countDelay])

  const clickPlus = () => setCount(count + 1)
  const clickMinus = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  return (
    <div className={style.block}>
    <div className={style.blockScreen}>
      {productScreen
        ? <img alt={productTitle} className={style.image} src={productScreen} />
        : <i className="bi bi-image text-4xl"></i>
      }
    </div>
    <div className={style.blockTitle}>
      {productTitle}
    </div>
    {InBasket && InBasket && count &&
    <div title={'Количество товара'} className={style.blockCount}>
      <span>
        <a
          href=""
          className={style.button}
          onClick={(e) => {
            e.preventDefault()
            clickPlus()
          }}
        >+</a>
      </span>
      <span>{count}</span>
      <span>
        <a
          href=""
          className={style.button}
          onClick={(e) => {
            e.preventDefault()
            clickMinus()
          }}
        >-</a>
      </span>
    </div>
    }
      <div className={style.blockButton}>
        <span
          onClick={clickToProduct}
          className={style.link}
        >
          <i className="bi bi-arrow-right-square-fill text-2xl text-gray-600"/>
        </span>
        {!InBasket &&
        <span className={style.link}>
          <i className="bi bi-pencil-fill text-2xl text-indigo-700"/>
        </span>
        }
        <span
          onClick={() => onDelete(productId, productTitle)}
          className={style.link}
        >
          <i className="bi bi-trash3-fill text-2xl text-red-600"/>
        </span>
      </div>
    </div>
  )
}

export default ProductItemBasket
