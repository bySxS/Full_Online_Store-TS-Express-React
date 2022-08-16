import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ICategoryOut } from 'store/myStore/myStoreCategory.interface'
import { RoutePath } from 'AppRouter'

interface ISubCategoryProps {
  category: ICategoryOut
}

const SubCategory: FC<ISubCategoryProps> = ({ category }) => {
  return (
    <li key={category.categoryId}>
      <NavLink
        to={RoutePath.PRODUCTS + '/category/' + category.categoryId}
        className="sideBarLink"
      >
        {category.categoryName} ({category.categoryCountProducts})
      </NavLink>
    </li>
  )
}

export default SubCategory
