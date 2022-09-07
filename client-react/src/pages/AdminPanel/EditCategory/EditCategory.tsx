import React, { useEffect, useState } from 'react'
import { useProducts } from 'hooks/useSelectors'
import CategorySection from 'components/CategorySection/CategorySection'
import st from 'components/SideBar/SideBar.module.scss'
import { ModalComponent } from 'components/UI/Modal/ModalComponent'
import MyLink from 'components/UI/MyLink/MyLink'
import style from './EditCategory.module.scss'
import FormCategory, { IFormCategoryState } from './FormCategory/FormCategory'

const EditCategory = () => {
  const { allCategory } = useProducts()
  const [show, setShow] = useState<number[]>([])
  const [form, setForm] = useState<IFormCategoryState>()
  const [showModalEdit, setShowModalEdit] = useState(false)
  const { showCategory } = useProducts()
  useEffect(() => {
    setShow([])
  }, [showCategory])

  const clickShowForm = (payload: IFormCategoryState) => {
    setShow([])
    setForm(payload)
    setShowModalEdit(!showModalEdit)
  }
  return (
    <>
    <div className={style.blockCategory}>
      <ul>
      {allCategory?.map(category =>
        <CategorySection
          categorySection={category}
          key={category.sectionId}
          edit={true}
          clickEdit={clickShowForm}
          show={show}
          setShow={setShow}
        />
      )}
       <li>
         <MyLink
           className={'sideBarLink'}
           onClick={() => clickShowForm({
             type: 'add'
           })}
         >
           <i className={`bi bi-plus-circle-fill ${st.icon}`}/>
           Добавить
         </MyLink>
       </li>
      </ul>
    </div>
      {showModalEdit &&
      <ModalComponent
        title={`${form?.type === 'add'
          ? 'Добавить категорию'
          : form?.type === 'upd'
        ? 'Редактируем категорию'
        : form?.type === 'del'
        ? 'Удаляем категорию'
        : ''
        }`}
        onClose={() => setShowModalEdit(!showModalEdit)}
        show={showModalEdit}
      >
      <FormCategory
        form={form}
        onCloseForm={() => setShowModalEdit(!showModalEdit)}
      />
      </ModalComponent>
      }
    </>
  )
}

export default EditCategory
