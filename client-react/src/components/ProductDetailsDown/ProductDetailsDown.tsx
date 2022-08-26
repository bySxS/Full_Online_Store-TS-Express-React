import React, { FC, useState } from 'react'
import { Button } from 'react-bootstrap'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import Review from '../Review/Review'
import Characteristics from './Characteristics/Characteristics'
import Description from './Description/Description'
import PriceDynamic from './PriceDynamic/PriceDynamic'
import style from './ProductDetailsDown.module.scss'

interface IProductDetailsDown {
  product: IProduct
}

const ProductDetailsDown: FC<IProductDetailsDown> = ({ product }) => {
  const [openTab, setOpenTab] = useState<1 | 2 | 3 | 4>(1)

  const clickButton = (i: 1 | 2 | 3 | 4) => {
    setOpenTab(i)
  }

  return (
    <div className={style.secondContainer}>
      <div className={style.blockButton}>
        <div className={style.divButton}>
          <Button
            className={`${style.button} ${openTab === 1 ? style.activeButton : ''}`}
            onClick={() => clickButton(1)}
            variant={''}
          >
            Описание
          </Button>
        </div>
        <div className={style.divButton}>
          <Button
            className={`${style.button} ${openTab === 2 ? style.activeButton : ''}`}
            onClick={() => clickButton(2)}
            variant={''}
          >
            Характеристики
          </Button>
        </div>
        <div className={style.divButton}>
          <Button
            className={`${style.button} ${openTab === 3 ? style.activeButton : ''}`}
            onClick={() => clickButton(3)}
            variant={''}
          >
            Отзывы
          </Button>
        </div>
        <div className={style.divButton}>
          <Button
            className={`${style.button} ${openTab === 4 ? style.activeButton : ''}`}
            onClick={() => clickButton(4)}
            variant={''}
          >
            Динамика цены
          </Button>
        </div>
      </div>
      <div className={style.blockContainer}>
        {openTab === 1 &&
        <div className={style.description}>
          <Description description={product.description} />
        </div>
        }
        {openTab === 2 &&
          <div className={style.characteristics}>
            <Characteristics productId={product.id}/>
          </div>
        }
        {openTab === 3 &&
          <div className={style.review}>
          <Review productId={product.id} />
        </div>
        }
        {openTab === 4 &&
          <div className={style.dynamicPrice}>
            <PriceDynamic/>
          </div>
        }
      </div>
    </div>
  )
}

export default ProductDetailsDown
