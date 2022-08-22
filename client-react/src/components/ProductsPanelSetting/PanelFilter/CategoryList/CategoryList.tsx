import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useAppSelector } from 'hooks/useStore'
import selectCategory from 'store/category/category.selector'
import style from './CategoryList.module.scss'

const CategoryList = () => {
  const [openCategories, setOpenCategories] = useState(true)
  const categoryList = useAppSelector(selectCategory.categoryList)

  const clickOpenContainer = (e: React.MouseEvent) => {
    e.preventDefault()
    e.currentTarget.innerHTML = (openCategories
      ? '<i class="bi bi-caret-up-fill"> Категории</i>'
      : '<i class="bi bi-caret-down-fill"> Категории</i>')
    setOpenCategories(!openCategories)
  }

  return (
    <>
    <a
      href=""
      className={style.linkOpenContainer}
      onClick={clickOpenContainer}
    >
      <i className="bi bi-caret-down-fill"> Категории</i>
    </a>
      {openCategories &&
        <div className={style.container}>
          <ul className={style.ul}>
          {categoryList.map((item) =>
            <Form.Check
              key={item.id}
              className={style.item}
              label={item.name}
              name="group1"
              type={'radio'}
            />
          )}
          </ul>
        </div>
      }
    </>
  )
}

export default CategoryList
