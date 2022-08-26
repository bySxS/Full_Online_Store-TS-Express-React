import React, { FC, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ICategorySection } from 'store/myStore/myStoreCategory.interface'
import { RoutePath } from 'AppRouter'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import selectCategory from 'store/category/category.selector'
import MyOverlay from 'components/UI/MyOverlay/MyOverlay'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import st from '../SideBar.module.scss'
import Category from './Category/Category'

interface ICategoryProps {
  categorySection: ICategorySection
}

const CategorySection: FC<ICategoryProps> = ({ categorySection }) => {
  const showCategory = useAppSelector(selectCategory.showCategory)
  const { setShowCategory } = useAppActions()
  const navigate = useNavigate()
  const { setBreadcrumb } = useBreadcrumb()
  const { changeFilterState } = useAppActions()
  const ref = useRef<HTMLLIElement>(null)

  const handleFocus = () => {
    setShowCategory([categorySection.sectionId])
  }

  const clickGoToPage = () => {
    navigate(RoutePath.PRODUCTS + '/category/' + categorySection.sectionId)
    changeFilterState({
      categoryId: categorySection.sectionId
    })
    setBreadcrumb({
      moduleName: 'Товары',
      moduleLink: '/products',
      sectionName: categorySection.sectionName,
      sectionId: categorySection.sectionId
    })
  }

  return (
    <>
      <li ref={ref}>
        <NavLink
          onClick={clickGoToPage}
          to={RoutePath.PRODUCTS + '/category/' + categorySection.sectionId}
          onMouseEnter={handleFocus}
          className="sideBarLink pl-[10px]"
        >
          <i className={`${categorySection.sectionIconClass} ${st.icon}`}/>
          <span className={st.name_page}>
          {categorySection.sectionName} ({categorySection.sectionCountProducts})
          </span>
        </NavLink>
      </li>
      <MyOverlay
        show={showCategory.includes(categorySection.sectionId)}
        target={ref.current}
        title={`Раздел ${categorySection.sectionName}`}
        tabIndex={categorySection.sectionId}
      >
        <ul>
          {categorySection.category.map(cat =>
            <Category
              category={cat}
              key={cat.categoryId}
              sectionId={categorySection.sectionId}
              sectionName={categorySection.sectionName}
            />
          )}
        </ul>
      </MyOverlay>
    </>
  )
}

export default CategorySection
