import React, { FC, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { ICategoryOut } from 'store/myStore/myStoreCategory.interface'
import { RoutePath } from 'AppRouter'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import selectCategory from 'store/category/category.selector'
import MyOverlay from 'components/UI/MyOverlay/MyOverlay'
import SubCategory from './SubCategory/SubCategory'

interface ICategoryProps {
  category: ICategoryOut
}

const Category: FC<ICategoryProps> = ({ category }) => {
  const showCategory = useAppSelector(selectCategory.showCategory)
  const { setShowCategory } = useAppActions()
  const ref = useRef<HTMLLIElement>(null)

  const handleFocus = () => {
    if (category.subcategory) {
      setShowCategory([showCategory[0], category.categoryId])
    } else {
      setShowCategory([showCategory[0]])
    }
  }

  // const handleClick = () => {
  //   setShowCategory([])
  // }

  return (
    <>
      <li ref={ref}>
        <NavLink
          onMouseEnter={handleFocus}
          // onClick={handleClick}
          to={RoutePath.PRODUCTS + '/category/' + category.categoryId}
          className={`sideBarLink ${category.subcategory ? 'font-medium' : ''}`}
        >
          {category.categoryName} ({category.categoryCountProducts}) {category.subcategory ? '   >' : ''}
        </NavLink>
      </li>
      <MyOverlay
        show={showCategory.includes(category.categoryId)}
        target={ref.current}
        title={`Категория ${category.categoryName}`}
        tabIndex={category.categoryId}
        marginLeft={25}
      >
        <ul>
          {category.subcategory?.map(cat =>
            <SubCategory category={cat} key={cat.categoryId}/>
          )}
        </ul>
      </MyOverlay>
    </>
  )
}

export default Category
