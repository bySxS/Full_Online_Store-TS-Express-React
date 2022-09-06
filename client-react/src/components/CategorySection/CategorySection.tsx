import React, {
  Dispatch, FC, SetStateAction, useRef
} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ICategorySection } from 'store/myStore/myStoreCategory.interface'
import { RoutePath } from 'AppRouter'
import { useAppActions } from 'hooks/useStore'
import MyOverlay from 'components/UI/MyOverlay/MyOverlay'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import { IFormCategoryState } from 'pages/AdminPanel/EditCategory/FormCategory/FormCategory'
import st from '../SideBar/SideBar.module.scss'
import MyLink from '../UI/MyLink/MyLink'
import ButtonEditCategory from './ButtonEditCategory/ButtonEditCategory'
import Category from './Category/Category'

interface ICategoryProps {
  categorySection: ICategorySection
  setShow: Dispatch<SetStateAction<number[]>>
  show: number[]
  edit?: boolean
  clickEdit?: (payload: IFormCategoryState) => void
}

const CategorySection: FC<ICategoryProps> = ({
  categorySection,
  edit = false,
  setShow,
  show,
  clickEdit
}) => {
  const navigate = useNavigate()
  const { setBreadcrumb } = useBreadcrumb()
  const { changeFilterState } = useAppActions()
  const ref = useRef<HTMLLIElement>(null)

  const handleFocus = () => {
    setShow([categorySection.sectionId])
  }

  const clickGoToPage = (e: React.MouseEvent) => {
    e.stopPropagation()
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
          <span className={!edit ? st.namePage : ''}>
          {categorySection.sectionName} ({categorySection.sectionCountProducts})
          </span>
          {edit && clickEdit &&
          <ButtonEditCategory
              category={{
                id: categorySection.sectionId,
                iconClass: categorySection.sectionIconClass,
                name: categorySection.sectionName,
                nameEng: categorySection.sectionNameEng
              }}
              clickEdit={clickEdit}
          />
          }
        </NavLink>
      </li>
      <MyOverlay
        show={show.includes(categorySection.sectionId)}
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
              setShow={setShow}
              show={show}
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
                    parentId: categorySection.sectionId
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

export default CategorySection
