import React, { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ICategoryOut } from 'store/myStore/myStoreCategory.interface'
import { RoutePath } from 'AppRouter'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import { useAppActions } from 'hooks/useStore'

interface ISubCategoryProps {
  category: ICategoryOut
  sectionId: number
  sectionName: string
  categoryName: string
  categoryId: number
}

const SubCategory: FC<ISubCategoryProps> = ({
  category,
  categoryName, categoryId,
  sectionName, sectionId
}) => {
  const { setBreadcrumb } = useBreadcrumb()
  const navigate = useNavigate()
  const { changeFilterState } = useAppActions()

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
      categoryName,
      categoryId,
      subCategoryId: category.categoryId,
      subCategoryName: category.categoryName
    })
  }

  return (
    <li key={category.categoryId}>
      <NavLink
        onClick={clickGoToPage}
        to={RoutePath.PRODUCTS + '/category/' + category.categoryId}
        className="sideBarLink"
      >
        {category.categoryName} ({category.categoryCountProducts})
      </NavLink>
    </li>
  )
}

export default SubCategory
