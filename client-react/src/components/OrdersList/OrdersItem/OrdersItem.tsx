import dayjs from 'dayjs'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  IBasket, IBasketProductOut, TBasketStatusRus
} from 'store/myStore/myStoreBasket.interface'
import { addHostServerToFileLink } from 'utils'
import { ModalComponent } from 'components/UI/Modal/ModalComponent'
import { RoutePath } from 'AppRouter'
import FormCancelOrder from '../FormOrdersChange/FormCancelOrder'
import FormOrdersChange from '../FormOrdersChange/FormOrdersChange'
import style from './OrdersItem.module.scss'

interface IOrdersItem {
  order: IBasket
  inAdmin?: boolean
}

const OrdersItem: FC<IOrdersItem> = ({
  order,
  inAdmin
}) => {
  const navigate = useNavigate()
  const [showFormCancel, setShowFormCancel] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [products, setProducts] = useState<IBasketProductOut[]>(order.BasketProducts.map(i =>
    ({
      ...i,
      productScreen: addHostServerToFileLink(i.productScreen, i.productId, 'products_pic')
    })))
  const [price, setPrice] = useState<number>(products.reduce((prev, i) =>
    prev + i.currentPrice * i.productCount, 0))
  const [status, setStatus] = useState<TBasketStatusRus>(
    order.status === 'SelectsTheProduct'
      ? 'Выбор продуктов'
      : order.status === 'InProcessing'
        ? 'В обработке'
        : order.status === 'InDelivery'
          ? 'В доставке'
          : order.status === 'Completed'
            ? 'Выполнен'
            : order.status === 'Cancelled'
              ? 'Отменён'
              : 'Выбор продуктов')
  useEffect(() => {
    setProducts(order.BasketProducts.map(i => ({
      ...i,
      productScreen: addHostServerToFileLink(i.productScreen, i.productId, 'products_pic')
    })))
    setStatus(order.status === 'SelectsTheProduct'
      ? 'Выбор продуктов'
      : order.status === 'InProcessing'
        ? 'В обработке'
        : order.status === 'InDelivery'
          ? 'В доставке'
          : order.status === 'Completed'
            ? 'Выполнен'
            : order.status === 'Cancelled'
              ? 'Отменён'
              : 'Выбор продуктов')
  }, [order])
  useEffect(() => {
    setPrice(products.reduce((prev, i) =>
      prev + i.currentPrice * i.productCount, 0))
  }, [products])
  return (
    <>
    <div className={style.block}>
      <div className={style.id}>
        {order.id}
      </div>
      <div className={style.blockGeneral}>
      <div className={style.blockInfo}>
      <div className={style.info}>
        <div className={style.status}>
          <span>
           Статус:
            {!inAdmin && order.status === 'InProcessing' &&
              <i
              title={'Отменить заказ?'}
              className="bi bi-x-circle-fill pl-2 text-red-900 hover:text-red-600"
              onClick={() => setShowFormCancel(!showFormCancel)}
            />
            }
          </span>
          <span className={style.statusName}>
            {status}
          </span>
          {order.dateProcessing &&
            (order.status === 'Completed' ||
              order.status === 'Cancelled') &&
            <span className={'text-xs text-green-800'}>
            Дата обработки: {dayjs(order.dateProcessing)
              .format('YYYY.MM.DD HH:mm')}
          </span>
          }
          {order.deliveryDate &&
            order.status === 'InDelivery' &&
          <span className={'text-xs text-green-800'}>
            Дата доставки: {dayjs(order.deliveryDate)
            .format('YYYY.MM.DD HH:mm')}
          </span>
          }
        </div>
        {order.comment &&
        <div className={style.comment}>
          <span>
            Комментарий:
          </span>
          <span className={style.commentText}>
            {order.comment}
          </span>
        </div>}
      </div>
      {products &&
        <div className={style.productsOverflow}>
        <div className={style.products}>
        {products.map(product =>
          <div
            key={product.id}
            className={style.blockImage}
            title={`Перейти на страницу продукта ${product.productTitle}`}
            onClick={() => {
              if (product.id) {
                navigate(`${RoutePath.PRODUCTS}/${product.productId}`)
              }
            }}
          >
            <div className={style.count}>
              {product.productCount}
            </div>
          <img
            alt={product.productTitle}
            src={product.productScreen}
            loading={'lazy'}
            className={style.image}
          />
          </div>
        )}
      </div>
      </div>}
      <div className={style.price}>
        <span className={style.priceName}>
          Цена:
        </span>
        <span className={style.priceColor}>
          {price}₴
        </span>
      </div>
      </div>
        {inAdmin &&
          <div className={'flex'}>
          <div className={style.blockAdmin}>
              <div>ФИО: {order.fullName}</div>
              <div>Адрес доставки: {order.deliveryAddress}</div>
              {order.deliveryDate &&
                <div>Дата доставки: {dayjs(order.deliveryDate)
                  .format('YYYY.MM.DD HH:mm')}
                </div>
              }
              {/* </div> */}
              {/* <div className={'flex flex-col'}> */}
              <div>Номер телефона: {order.phoneNumber}</div>
              {order.dateProcessing &&
                <div>Дата обработки: {dayjs(order.dateProcessing)
                  .format('YYYY.MM.DD HH:mm')}
                </div>
              }
              <div>Дата изм.заказа: {dayjs(order.updatedAt)
                .format('YYYY.MM.DD HH:mm')}
              </div>
          </div>
            <span
              onClick={() => setShowForm(!showForm)}
              className={style.linkProcess}
            >
              <i className="bi bi-pencil-fill text-indigo-700 pr-1"/>
              Обработать заказ
            </span>
          </div>
        }
      </div> {/* blockGeneral */}
    </div>
      {showForm &&
        <ModalComponent
          title={'Редактируем заказ номер #' + order.id}
          onClose={() => setShowForm(!showForm)}
          show={showForm}
          size={'xl'}
          className={'w-[500px]'}
        >
          <FormOrdersChange
            basketId={order.id}
            defaultValue={{
              comment: order.comment || '',
              dateProcessing: dayjs().format('YYYY.MM.DD HH:mm'),
              deliveryDate: dayjs().format('YYYY.MM.DD HH:mm'),
              status: order.status,
              forciblyUpd: true
            }}
            onCloseWindow={() => setShowForm(!showForm)}
          />
        </ModalComponent>
      }
      {showFormCancel &&
        <ModalComponent
          title={'Отменяем заказ номер #' + order.id}
          onClose={() => setShowFormCancel(!showFormCancel)}
          show={showFormCancel}
          size={'xl'}
          className={'w-[500px]'}
        >
          <FormCancelOrder
            basketId={order.id}
            onCloseWindow={() => setShowFormCancel(!showFormCancel)}
          />
        </ModalComponent>
      }
    </>
  )
}

export default OrdersItem
