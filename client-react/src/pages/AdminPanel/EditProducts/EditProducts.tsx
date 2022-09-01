import React, { useEffect, useState } from 'react'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { Button } from 'react-bootstrap'
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
import style from './EditProducts.module.scss'
import FormAddCharacteristicsValue from './FormAddCharacteristicsValue/FormAddCharacteristicsValue'
import FormProducts from './FormProducts/FormProducts'

const EditProducts = () => {
  const { setBreadcrumb } = useBreadcrumb()
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState<IProduct[]>([])
  const [totalPage, setTotalPage] = useState(0)
  const [formProduct, setFormProduct] = useState<IProduct>({} as IProduct)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [formChar, setFormChar] = useState<{ id: number, title: string, categoryId: number }>()
  const [showFormChar, setShowFormChar] = useState<boolean>(false)
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

  const changePage = (currPage: number) => {
    setPage(currPage)
  }

  const onCreate = () => {
    setFormProduct({} as IProduct)
    setShowForm(!showForm)
  }

  const onChange = (id: number) => {
    setFormProduct(products.filter(i => i.id === id)[0])
    setShowForm(!showForm)
  }

  const onEditChar = (id: number, title: string) => {
    const categoryId = products.filter(i => i.id === id)[0].categoryId
    setFormChar({ id, title, categoryId })
    setShowFormChar(!showFormChar)
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
        <div className={style.blockPagination}>
          <Pagination
            totalPage={totalPage}
            page={page}
            onChangePage={changePage}
          />
        </div>
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
      {showForm &&
        <ModalComponent
          title={formProduct.title !== undefined && formProduct.title !== ''
            ? 'Редактируем продукт ' + formProduct.title
            : 'Добавляем новый продукт'}
          onClose={() => setShowForm(!showForm)}
          show={showForm}
          size={'xl'}
          className={'w-[1000px]'}
        >
          <FormProducts
            defaultValue={formProduct}
            onCloseWindow={() => setShowForm(!showForm)}
          />
        </ModalComponent>
      }
      {showFormChar && formChar &&
        <ModalComponent
          title={'Редактируем продукт ' + formChar.title}
          onClose={() => setShowFormChar(!showFormChar)}
          show={showFormChar}
          size={'xl'}
          className={'w-[1000px]'}
        >
        <FormAddCharacteristicsValue
          productId={formChar.id}
          categoryId={formChar.categoryId}
        />
        </ModalComponent>
      }
    </>
  )
}

export default EditProducts
