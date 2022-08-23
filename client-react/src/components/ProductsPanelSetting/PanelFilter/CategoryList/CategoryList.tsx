import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import selectCategory from 'store/category/category.selector'
import selectProduct from 'store/product/product.selector'
import { IFilterState } from 'store/myStore/myStoreProduct.interface'
import { useDebounce } from 'hooks/useDebounce'
import style from './CategoryList.module.scss'

const CategoryList = () => {
  const filterState = useAppSelector(selectProduct.filterState)
  const [filter, setFilter] = useState<IFilterState>(filterState)
  const filterDaley = useDebounce(filter, 500)
  const [openCategories, setOpenCategories] = useState(true)
  const categoryList = useAppSelector(selectCategory.categoryList)
  const { changeFilterState } = useAppActions()

  useEffect(() => {
    changeFilterState(filterDaley as IFilterState)
  }, [filterDaley])

  const clickOpenContainer = (e: React.MouseEvent) => {
    e.preventDefault()
    e.currentTarget.innerHTML = (openCategories
      ? '<i class="bi bi-caret-up-fill"> Категории</i>'
      : '<i class="bi bi-caret-down-fill"> Категории</i>')
    setOpenCategories(!openCategories)
  }

  const clickChangeCategory = (e: React.ChangeEvent<HTMLInputElement>, id: number | undefined) => {
    setFilter({ categoryId: id })
  }

  return (
    <div
      className={style.block}
      style={openCategories
        ? { flex: '1 0 215px' }
        : { flex: '1 0 30px' }}
    >
    <a
      href=""
      className={style.linkOpenContainer}
      onClick={clickOpenContainer}
    >
      <i className="bi bi-caret-down-fill"> Категории</i>
    </a>
      {openCategories &&
        <div
          className={style.container}
          // style={!openCategories ? { display: 'none' } : {}}
        >
          <ul className={style.ul}>
            <Form.Check
              key={0}
              className={style.item}
              label={'Все категории'}
              onChange={(event) => clickChangeCategory(event, undefined)}
              defaultChecked={(filterState.categoryId === undefined || filterState.categoryId === 0)}
              name="group1"
              type={'radio'}
              id={'default-radio-0'}
            />
          {categoryList.map((item) =>
            <Form.Check
              key={item.id}
              className={style.item}
              label={item.name}
              onChange={(event) => clickChangeCategory(event, item.id || 0)}
              defaultChecked={filterState.categoryId === item.id}
              name="group1"
              type={'radio'}
              id={`default-radio-${item.id}`}
            />
          )}
          </ul>
        </div>
      }
    </div>
  )
}

export default CategoryList
