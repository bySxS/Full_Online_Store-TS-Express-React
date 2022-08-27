import React, { FC, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'AppRouter'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import { useAppActions } from 'hooks/useStore'
import style from './Home.module.scss'

interface HomeProps {
  name: string
}

const Home: FC<HomeProps> = ({ name }) => {
  const { setBreadcrumb } = useBreadcrumb()
  const { changeFilterState } = useAppActions()
  useEffect(() => {
    setBreadcrumb({})
    changeFilterState({})
  }, [])
  const navigate = useNavigate()
  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="My First Store - {name}" />
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <div className={style.block}>
        <div className={style.containerFirst}>
          <img
            className={style.imgFirst}
            src={process.env.PUBLIC_URL + '/1.jpg'}
            alt={'Акции'}
            loading={'lazy'}
          />
        </div>
        <div className={style.containerSecond}>
          <div
            onClick={() => {
              changeFilterState({ categoryId: 9 })
              navigate(`${RoutePath.PRODUCTS}/category/9`)
            }}
            className={style.leftBlock}
          >
            <img
              className={style.imgSecond}
              src={process.env.PUBLIC_URL + '/2.jpg'}
              alt={'Ноутбуки'}
              loading={'lazy'}
            />
          </div>
          <div
            onClick={() => {
              changeFilterState({ categoryId: 8 })
              navigate(`${RoutePath.PRODUCTS}/category/8`)
            }}
            className={style.rightBlock}
          >
            <img
              className={style.imgThird}
              src={process.env.PUBLIC_URL + '/3.jpg'}
              alt={'Смартфоны'}
              loading={'lazy'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
