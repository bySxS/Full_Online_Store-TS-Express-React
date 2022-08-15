import React, { FC } from 'react'
import { ICategoryOut } from 'store/myStore/myStoreCategory.interface'

interface ICategoryProps {
  category: ICategoryOut
}

const Category: FC<ICategoryProps> = ({ category }) => {
  return (
    <li key={category.categoryId}>
      {category.categoryName} ({category.categoryCountProducts})
    </li>
  )
}

export default Category
