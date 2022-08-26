import React, { FC, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ICategoryOut } from 'store/myStore/myStoreCategory.interface'
import { RoutePath } from 'AppRouter'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import selectCategory from 'store/category/category.selector'
import MyOverlay from 'components/UI/MyOverlay/MyOverlay'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import SubCategory from './SubCategory/SubCategory'

interface ICategoryProps {
  category: ICategoryOut
  sectionId: number
  sectionName: string
}

const Category: FC<ICategoryProps> = ({ category, sectionName, sectionId }) => {
  const showCategory = useAppSelector(selectCategory.showCategory)
  const { setShowCategory, changeFilterState } = useAppActions()
  const ref = useRef<HTMLLIElement>(null)
  const { setBreadcrumb } = useBreadcrumb()
  const navigate = useNavigate()
  const handleFocus = () => {
    if (category.subcategory) {
      setShowCategory([showCategory[0], category.categoryId])
    } else {
      setShowCategory([showCategory[0]])
    }
  }

  const clickGoToPage = () => {
    navigate(RoutePath.PRODUCTS + '/category/' + category.categoryId)
    changeFilterState({
      categoryId: category.categoryId
    })
    setBreadcrumb({
      moduleName: 'Товары',
      moduleLink: '/products',
      sectionName,
      sectionId,
      categoryName: category.categoryName,
      categoryId: category.categoryId
    })
  }

  return (
    <>
      <li ref={ref}>
        <NavLink
          onMouseEnter={handleFocus}
          onClick={clickGoToPage}
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
            <SubCategory
              category={cat}
              key={cat.categoryId}
              categoryName={category.categoryName}
              categoryId={category.categoryId}
              sectionName={sectionName}
              sectionId={sectionId}
            />
          )}
        </ul>
      </MyOverlay>
    </>
  )
}

export default Category
