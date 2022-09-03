import React, { useEffect, useState } from 'react'
import { useProducts } from 'hooks/useSelectors'
import { Form, InputGroup } from 'react-bootstrap'
import {
  useLazyGetAllCharacteristicsNameByCategoryIdQuery
} from 'store/myStore/myStoreCharacteristics.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { ModalComponent } from 'components/UI/Modal/ModalComponent'
import MyLink from '../../../components/UI/MyLink/MyLink'
import ButtonEditCharacteristics from './ButtonEditCharacteristics/ButtonEditCharacteristics'
import style from './EditCharacteristics.module.scss'
import FormCharacteristics, {
  IFormCharacteristicsState
} from './FormCharacteristics/FormCharacteristics'

const EditCharacteristics = () => {
  const [categoryId, setCategoryId] = useState<number>(0)
  const [form, setForm] = useState<IFormCharacteristicsState>({} as IFormCharacteristicsState)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const { categoryList } = useProducts()
  const [getCharacteristics, {
    isLoading, isSuccess, isError, data, error
  }] = useLazyGetAllCharacteristicsNameByCategoryIdQuery()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })

  useEffect(() => {
    getCharacteristics({ categoryId })
  }, [categoryId])

  const handleChangeSelect =
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      setCategoryId(+value)
    }
  const clickShowForm = (payload: IFormCharacteristicsState) => {
    setForm(payload)
    setShowModalEdit(!showModalEdit)
  }
  return (
    <>
    <div className={style.block}>
      <div className={style.blockSelectCategory}>
          <Form.Label>Выберите категорию</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text id="basic-addon1">
              <i className={'bi bi-grid-fill'}/>
            </InputGroup.Text>
            <Form.Select
              name={'categoryId'}
              onChange={handleChangeSelect}
              defaultValue={0}
            >
              <option value={0}>{''}</option>
              {categoryList.map((item) =>
                <option key={item.id} value={item.id}>{item.name}</option>
              )}
            </Form.Select>
          </InputGroup>
      </div>
      {isSuccess && data &&
       <div className={style.blockCharacteristics}>
         <ul className={style.ulSection}> {/* section start */}
         {data.result?.map(section =>
          <li
            className={style.liSection}
            key={section.sectionId}
          >
            <span className={style.sectionName}>  {/* edit section button */}
              {section.sectionName}
              {section.sectionName &&
                <ButtonEditCharacteristics
                characteristics={{
                  name: section.sectionName,
                  categoryId,
                  parentId: undefined,
                  fieldType: undefined,
                  id: section.sectionId
                }}
                section={true}
                clickEdit={clickShowForm}
                />
              }
            </span>
              <ul className={style.ulChar}>
              {section.characteristics?.map(char =>
                <li
                  className={style.liChar}
                  key={char.characteristicNameId}
                >
                   <span className={style.charName}> {/* edit char button */}
                     {char.characteristicName}
                     <ButtonEditCharacteristics
                      characteristics={{
                        name: char.characteristicName,
                        categoryId,
                        parentId: section.sectionId,
                        fieldType: char.characteristicsFieldType,
                        id: char.characteristicNameId
                      }}
                      clickEdit={clickShowForm}
                     />
                   </span>
                </li>
              )}
                {/* add char name */}
                <li
                  className={style.liChar}
                >
                <span className={style.charName}>
                <MyLink
                  onClick={() => clickShowForm({
                    type: 'add',
                    body: {
                      parentId: section.sectionId,
                      categoryId
                    },
                    section: false
                  })
                  }
               >
              <i className={'bi bi-plus-circle-fill pr-1'}/>
              Добавить название характеристики
              </MyLink>
                </span>
                </li>  {/* char end */}
              </ul>
          </li>
         )}
           {/* add section name */}
           <li
             className={style.liSection}
           >
             <span className={style.sectionName}>
             <MyLink
               onClick={() => clickShowForm({
                 type: 'add',
                 body: {
                   parentId: undefined,
                   categoryId
                 },
                 section: true
               })
                }
             >
               <i className={'bi bi-plus-circle-fill pr-1'}/>
               Добавить раздел характеристики
             </MyLink>
             </span>
           </li>
         </ul> {/* section end */}
      </div>
      }
    </div>
      {showModalEdit &&
        <ModalComponent
          title={`${form?.type === 'add'
            ? `Добавить ${form.section ? 'раздел' : 'название'} характеристики`
            : form?.type === 'upd'
              ? `Изменить ${form.section ? 'раздел' : 'название'} характеристики`
              : form?.type === 'del'
                ? `Удалить ${form.section ? 'раздел' : 'название'} характеристики`
                : ''
          }`}
          onClose={() => setShowModalEdit(!showModalEdit)}
          show={showModalEdit}
        >
        <FormCharacteristics
          form={form}
          onCloseForm={() => setShowModalEdit(!showModalEdit)}
        />
        </ModalComponent>
      }
    </>
  )
}

export default EditCharacteristics
