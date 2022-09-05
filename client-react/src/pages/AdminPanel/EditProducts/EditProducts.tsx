import React, { useEffect, useState } from 'react'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { Button } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import {
  useDelProductMutation,
  useLazyGetAllProductsQuery
} from 'store/myStore/myStoreProduct.api'
import ProductItemSmall from 'components/ProductItemSmall/ProductItemSmall'
import Pagination from 'components/Pagination/Pagination'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import { addDomainToImgProducts } from 'utils'
import { ModalComponent } from 'components/UI/Modal/ModalComponent'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import FormCharValueEdit, {
  IFormStateCharValue
} from './AddCharacteristicsValue/FormCharValueEdit'
import style from './EditProducts.module.scss'
import AddCharacteristicsValue from './AddCharacteristicsValue/AddCharacteristicsValue'
import FormProducts from './FormProducts/FormProducts'

const EditProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { setBreadcrumb } = useBreadcrumb()
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState<IProduct[]>([])
  const [totalPage, setTotalPage] = useState(0)
  const [formProduct, setFormProduct] = useState<IProduct>({} as IProduct)
  const [showFormProduct, setShowFormProduct] = useState(false)
  const [showChar, setShowChar] = useState(false)
  const [showFormChar, setShowFormChar] = useState(false)
  const [formStateChar, setFormStateChar] = useState<IFormStateCharValue>()
  const [formChar, setFormChar] = useState<{ id: number, title: string, categoryId: number }>()

  const [fetchProducts, {
    isLoading, isSuccess, isError, data, error
  }] = useLazyGetAllProductsQuery()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
  const [delProduct, {
    error: errorDel,
    data: dataDel,
    isError: isErrorDel,
    isLoading: isLoadingDel,
    isSuccess: isSuccessDel
  }] = useDelProductMutation()
  useInfoLoading({
    error: errorDel,
    data: dataDel,
    isError: isErrorDel,
    isLoading: isLoadingDel,
    isSuccess: isSuccessDel
  })

  useEffect(() => {
    fetchProducts({ limit: 10, page })
  }, [page])

  useEffect(() => {
    if (isSuccess && data) {
      setTotalPage(data.result.totalPage)
      setProducts(addDomainToImgProducts(data.result.results))
    }
    setBreadcrumb({})
  }, [isSuccess, data])

  useEffect(() => {
    const pageP = searchParams.get('page')
    if (pageP && +pageP !== page) {
      setPage(+pageP)
    }
  }, [searchParams])

  const onCreate = () => {
    setFormProduct({} as IProduct)
    setShowFormProduct(!showFormProduct)
  }

  const onChange = (id: number) => {
    setFormProduct(products.filter(i => i.id === id)[0])
    setShowFormProduct(!showFormProduct)
  }

  const onEditChar = (id: number, title: string) => {
    const categoryId = products.filter(i => i.id === id)[0].categoryId
    setFormChar({ id, title, categoryId })
    setShowChar(!showChar)
  }

  const onDelete = (id: number, title: string) => {
    const result = confirm('Вы уверены что хотите удалить продукт - ' + title + '?')
    if (result) {
      delProduct(id)
    }
  }

  return (
    <>
    <div className={style.block}>
      <div className={style.blockNavigate}>
      <Pagination
            totalPage={totalPage}
            page={page}
            setQueryPage={setSearchParams}
            setPage={setPage}
      />
      <div className={style.blockAddProduct}>
        <Button
          variant={'outline-warning'}
          onClick={onCreate}
          className={style.button}
        >
          Добавить продукт
        </Button>
      </div>
      </div>
      <div className={style.blockProducts}>
        {products &&
          products.map(product =>
      <ProductItemSmall
        key={product.id}
        productId={product.id}
        productScreen={product.screen}
        productTitle={product.title}
        onChange={onChange}
        onDelete={onDelete}
        onEditChar={onEditChar}
      />
          )}
      </div>
    </div>
      {showFormProduct &&
        <ModalComponent
          title={formProduct.title !== undefined && formProduct.title !== ''
            ? 'Редактируем продукт ' + formProduct.title
            : 'Добавляем новый продукт'}
          onClose={() => setShowFormProduct(!showFormProduct)}
          show={showFormProduct}
          size={'xl'}
          className={'w-[1000px]'}
        >
          <FormProducts
            defaultValue={formProduct}
            onCloseWindow={() => setShowFormProduct(!showFormProduct)}
          />
        </ModalComponent>
      }
      {showChar && formChar &&
        <ModalComponent
          title={'Редактируем характеристики ' + formChar.title}
          onClose={() => setShowChar(!showChar)}
          show={showChar}
          size={'xl'}
          className={'w-[1000px]'}
        >
        <AddCharacteristicsValue
          productId={formChar.id}
          categoryId={formChar.categoryId}
          setFormState={setFormStateChar}
          showForm={() => {
            setShowFormChar(!showFormChar)
            setShowChar(!showChar)
          }}
        />
        </ModalComponent>
      }
      {showFormChar && formStateChar &&
        <ModalComponent
          title={formStateChar?.title}
          onClose={() => {
            setShowChar(!showChar)
            setShowFormChar(!showFormChar)
          }
          }
          show={showFormChar}
          size={'xl'}
          center={true}
          className={'w-[1000px]'}
        >
          <FormCharValueEdit
            payload={formStateChar}
            onClose={() => {
              setShowChar(!showChar)
              setShowFormChar(!showFormChar)
            }}
          />
        </ModalComponent>
      }
    </>
  )
}

export default EditProducts
