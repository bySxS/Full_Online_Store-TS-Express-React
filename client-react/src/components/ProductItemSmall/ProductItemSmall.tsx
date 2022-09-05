import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'AppRouter'
import { useModal } from 'context/ModalContext'
import { useDebounce } from 'hooks/useDebounce'
import style from './ProductItemSmall.module.scss'

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
  productCount?: number
  InBasket?: boolean
  onDelete?: (id: number, title: string) => void
  onChange?: (id: number) => void
  onEditChar?: (id: number, title: string) => void
  onChangeCount?: (productId: number, productCount: number) => void
}

const ProductItemSmall: FC<IProductItemSmallProps> = ({
  productScreen,
  productId,
  productTitle,
  onDelete,
  onChange,
  onEditChar,
  onChangeCount,
  InBasket = false,
  productCount = 0
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
        ? <img
          alt={productTitle}
          title={productTitle}
          className={style.image}
          src={productScreen}
        />
        : <i className="bi bi-image text-4xl"></i>
      }
    </div>
    <div className={style.blockTitle}>
      {productTitle}
    </div>
    {InBasket && InBasket && count &&
    <div title={'Количество товара'}
         className={style.blockCount}
    >
      <span>
        <a
          href="components/ProductItemSmall/ProductItemSmall.tsx"
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
          href="components/ProductItemSmall/ProductItemSmall.tsx"
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
        {!InBasket && onChange &&
          <>
        <span
          onClick={() => onChange(productId)}
          className={style.link}
          title={'Редактировать'}
        >
          <i className="bi bi-pencil-fill text-2xl text-indigo-700"/>
        </span>
        {onEditChar &&
        <span
          onClick={() => onEditChar(productId, productTitle)}
          className={style.link}
          title={'Изменить / добавить характеристики'}
        >
          <i className="bi bi-plus-square text-2xl text-green-800"/>
        </span>
        }
          </>
        }
        {onDelete &&
        <span
          onClick={() => onDelete(productId, productTitle)}
          className={style.link}
          title={'Удалить'}
        >
          <i className="bi bi-trash3-fill text-2xl text-red-600"/>
        </span>
        }
      </div>
    </div>
  )
}

export default ProductItemSmall
