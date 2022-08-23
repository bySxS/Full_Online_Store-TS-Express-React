import React, { useEffect, useState } from 'react'
import { useDebounce } from 'hooks/useDebounce'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import selectProduct from 'store/product/product.selector'
import style from './PriceRange.module.scss'

interface IPriceInput {
  first?: number
  second?: number
}

const PriceRange = () => {
  const [showPrice, setShowPrice] = useState(true)
  const filterState = useAppSelector(selectProduct.filterState)
  const [price, setPrice] = useState<IPriceInput>({
    first: filterState.price?.split('_').map(item => +item)[0] || 0,
    second: filterState.price?.split('_').map(item => +item)[1] || 15000000
  })
  const priceDelay = useDebounce(price, 3000)
  const { changeFilterState } = useAppActions()

  useEffect(() => {
    if (priceDelay.first !== 0 || priceDelay.second !== 15000000) {
      changeFilterState({
        price: `${priceDelay.first}_${priceDelay.second}`
      })
    } else {
      changeFilterState({
        price: undefined
      })
    }
  }, [priceDelay])

  const clickOpenContainer = (e: React.MouseEvent) => {
    e.preventDefault()
    e.currentTarget.innerHTML = (showPrice
      ? '<i class="bi bi-caret-up-fill"> Цена</i>'
      : '<i class="bi bi-caret-down-fill"> Цена</i>')
    setShowPrice(!showPrice)
  }

  const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = e
    if (typeof (+value) !== 'number' || isNaN(+value)) {
      alert('Вводите только цифры!')
      if (name === 'first' || name === 'second') {
        e.target.value = String(price[name])
      }
    } else {
      setPrice((prev) => ({ ...prev, [name]: +value }))
    }
  }

  return (
    <div
      className={style.block}
      style={showPrice
        ? { flex: '1 0 85px' }
        : { flex: '1 0 30px' }}
    >
      <a
        href=""
        className={style.linkOpenContainer}
        onClick={clickOpenContainer}
      >
        <i className="bi bi-caret-down-fill"> Цена</i>
      </a>
      {showPrice &&
        <div className={style.container}>
          <input
            name={'first'}
            onChange={changePrice}
            className={style.input}
            defaultValue={price.first}/>
          <i className="bi bi-dash-lg px-1"/>
          <input
            name={'second'}
            onChange={changePrice}
            className={style.input}
            defaultValue={price.second}/>
        </div>
      }
    </div>
  )
}

export default PriceRange
