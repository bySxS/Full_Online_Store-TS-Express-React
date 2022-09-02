import React, { Dispatch, FC, SetStateAction, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ICategoryOut } from 'store/myStore/myStoreCategory.interface'
import { RoutePath } from 'AppRouter'
import { useAppActions } from 'hooks/useStore'
import MyOverlay from 'components/UI/MyOverlay/MyOverlay'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import st from 'components/SideBar/SideBar.module.scss'
import { IFormCategoryState } from 'pages/AdminPanel/EditCategory/FormCategory/FormCategory'
import MyLink from '../../UI/MyLink/MyLink'
import ButtonEditCategory from '../ButtonEditCategory/ButtonEditCategory'
import SubCategory from './SubCategory/SubCategory'

interface ICategoryProps {
  category: ICategoryOut
  sectionId: number
  sectionName: string
  setShow: Dispatch<SetStateAction<number[]>>
  show: number[]
  edit?: boolean
  clickEdit?: (payload: IFormCategoryState) => void
}

const Category: FC<ICategoryProps> = ({
  category,
  sectionName,
  sectionId,
  edit = false,
  clickEdit,
  setShow,
  show
}) => {
  const { changeFilterState } = useAppActions()
  const ref = useRef<HTMLLIElement>(null)
  const { setBreadcrumb } = useBreadcrumb()
  const navigate = useNavigate()
  const handleFocus = () => {
    if (category.subcategory || edit) {
      setShow([show[0], category.categoryId])
    } else {
      setShow([show[0]])
    }
  }

  const clickGoToPage = (e: React.MouseEvent) => {
    e.stopPropagation()
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
          {edit && clickEdit &&
          <ButtonEditCategory
              category={{
                id: category.categoryId,
                nameEng: category.categoryNameEng,
                name: category.categoryName,
                iconClass: category.categoryIconClass,
                parentId: sectionId
              }}
              clickEdit={clickEdit}
          />
          }
        </NavLink>
      </li>
      <MyOverlay
        show={show.includes(category.categoryId)}
        target={ref.current}
        title={`Подкатегория ${category.categoryName}`}
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
              edit={edit}
              clickEdit={clickEdit}
            />
          )}
          {edit && clickEdit &&
          <li>
            <MyLink
              className={'sideBarLink'}
              onClick={() => clickEdit({
                type: 'add',
                category: {
                  parentId: category.categoryId
                }
              })}
            >
              <i className={`bi bi-plus-circle-fill ${st.icon}`}/>
              Добавить
            </MyLink>
          </li>
          }
        </ul>
      </MyOverlay>
    </>
  )
}

export default Category
