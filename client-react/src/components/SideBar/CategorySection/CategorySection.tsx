import React, { FC } from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { ICategorySection } from 'store/myStore/myStoreCategory.interface'
import { RoutePath } from '../../../AppRouter'
import st from '../SideBar.module.scss'
import Category from './Category/Category'

interface ICategoryProps {
  categorySection: ICategorySection
}

const CategorySection: FC<ICategoryProps> = ({ categorySection }) => {
  return (
    <OverlayTrigger
      trigger="focus"
      key="right"
      placement="right"
      overlay={
        <Popover id={'popover-positioned-right'}>
          <Popover.Header as="h3">{`Раздел ${categorySection.sectionName}`}</Popover.Header>
          <Popover.Body>
            {categorySection.category.map(cat =>
              <Category category={cat} key={cat.categoryId}/>
            )}
          </Popover.Body>
        </Popover>
      }
    >
    <li key={categorySection.sectionId}>
      <NavLink to={RoutePath.PRODUCTS + '/category/' + categorySection.sectionId} className="sideBarLink">
        <i className={`bi bi-grid-fill ${st.icon}`}/>
        <span className={st.name_page}>
          {categorySection.sectionName} ({categorySection.sectionCountProducts})
        </span>
      </NavLink>
    </li>
    </OverlayTrigger>
  )
}

export default CategorySection
