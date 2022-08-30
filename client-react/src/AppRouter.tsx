import React, {
  ReactNode, Suspense, lazy, FC
} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from 'pages/Home/Home'
import Products from 'pages/Products/Products'
import Favorites from 'pages/Favorites/Favorites'
// import Basket from 'pages/Basket/Basket'
import ProductDetails from 'pages/ProductDetails/ProductDetails'
import AccessMiddleware, { IRequireUser } from 'components/AccessMiddleware/AccessMiddleware'
import Loader from 'components/UI/Loader/Loader'
import ActivateEmail from 'pages/ActivateEmail/ActivateEmail'
import { useAppSelector } from 'hooks/useStore'
import selectCategory from 'store/category/category.selector'

// test динамической подгрузки
const Error404 = lazy(() => import('pages/Error404/Error404'))
const AdminPanel = lazy(() => import('pages/AdminPanel/AdminPanel'))
const AllOrders = lazy(() => import('pages/AllOrders/AllOrders'))
const EditUsers = lazy(() => import('pages/AdminPanel/EditUsers/EditUsers'))
const EditCategory = lazy(() => import('pages/AdminPanel/EditCategory/EditCategory'))
const EditCharacteristics = lazy(() => import('pages/AdminPanel/EditCharacteristics/EditCharacteristics'))
const EditOrders = lazy(() => import('pages/AdminPanel/EditOrders/EditOrders'))
const EditProducts = lazy(() => import('pages/AdminPanel/EditProducts/EditProducts'))
const EditTypePrice = lazy(() => import('pages/AdminPanel/EditTypePrice/EditTypePrice'))

export type TRoles = 'admin' | 'moder' | 'user'

export enum RolesName {
  admin = 'admin',
  moder = 'moder',
  user = 'user'
}

export interface IRoute {
  path: string
  element: ReactNode
  lazy?: boolean
  allowAuth?: boolean
  allowRoles?: TRoles[] | TRoles
  allowUsers?: string[] | string
  breadcrumb: any
}

export enum RoutePath {
  HOME = '/',
  // LOGIN = '/login',
  ACTIVATE_EMAIL = '/activate/:link',
  PRODUCTS = '/products',
  PRODUCTS_CATEGORY = '/products/category/:id',
  PRODUCTS_ID = '/products/:id',
  FAVORITES_PRODUCT = '/favorites_products',
  // BASKET = '/basket',
  ALL_ORDERS = '/all_orders',
  ERROR_404 = '/404',
  ADMIN_PANEL = '/admin_panel',
  EDIT_CATEGORY = '/admin_panel/category',
  EDIT_USERS = '/admin_panel/users',
  EDIT_TYPE_PRICE = '/admin_panel/type_price',
  EDIT_CHARACTERISTICS = '/admin_panel/characteristics',
  EDIT_PRODUCTS = '/admin_panel/products',
  EDIT_ORDERS = '/admin_panel/orders'
}

export enum RouteName {
  HOME = 'Главная',
  // LOGIN = 'Вход',
  ACTIVATE_EMAIL = 'Активация e-mail',
  PRODUCTS = 'Товары',
  PRODUCTS_CATEGORY = 'Товары категории',
  FAVORITES_PRODUCT = 'Избранные товары',
  BASKET = 'Корзина',
  ALL_ORDERS = 'Все заказы',
  ERROR_404 = 'Ошибка 404',
  ADMIN_PANEL = 'Админ панель',
  EDIT_CATEGORY = 'Редактирование категорий',
  EDIT_USERS = 'Редактирование пользователей',
  EDIT_TYPE_PRICE = 'Редактирование тип цен',
  EDIT_CHARACTERISTICS = 'Редактирование названий характеристик для категорий',
  EDIT_PRODUCTS = 'Редактирование продуктов и характеристик к ним',
  EDIT_ORDERS = 'Обработка заказаов'
}

export interface IBreadcrumbParams {
  match: {
    params: {
      id: number
    }
  }
}

// мини компонент получения данных о продукте для breadcrumbs
const ProductIDBreadcrumb: FC<IBreadcrumbParams> = ({ match }) => {
  const { id } = match.params
  return (
    <span>Продукт с ID {id}</span>
  )
}

// мини компонент получения данных о пользователе для breadcrumbs
// const UserIDBreadcrumb: FC<IBreadcrumbParams> = ({ match }) => {
//   const { id } = match.params
//   return (
//     <span>Пользователь {id}</span>
//   )
// }

// мини компонент получения данных о category для breadcrumbs
const ProductsCategoryIDBreadcrumb: FC<IBreadcrumbParams> = ({ match }) => {
  const { id } = match.params
  const categoryName =
    useAppSelector(selectCategory.categoryNameById(+id))
  return (
    <span>{categoryName}</span>
  )
}

// навигация с доступом и lazy
export const routes: IRoute[] = [
  {
    path: RoutePath.HOME,
    element: <Home name={RouteName.HOME} />,
    breadcrumb: () => (<i className="bi bi-house-door-fill"/>)
  },
  // {
  //   path: RoutePath.LOGIN,
  //   allowAuth: false,
  //   element: <LoginReg name={RouteName.LOGIN}><Login/></LoginReg>,
  //   breadcrumb: RouteName.LOGIN
  // },
  {
    path: RoutePath.ACTIVATE_EMAIL,
    allowAuth: true,
    element: <ActivateEmail name={RouteName.ACTIVATE_EMAIL} />,
    breadcrumb: RouteName.ACTIVATE_EMAIL
  },
  {
    path: RoutePath.PRODUCTS,
    element: <Products name={RouteName.PRODUCTS} />,
    breadcrumb: RouteName.PRODUCTS
  },
  {
    path: RoutePath.PRODUCTS_CATEGORY,
    element: <Products name={RouteName.PRODUCTS_CATEGORY} />,
    breadcrumb: ProductsCategoryIDBreadcrumb
  },
  {
    path: RoutePath.PRODUCTS_ID,
    element: <ProductDetails />,
    breadcrumb: ProductIDBreadcrumb
  },
  {
    path: RoutePath.FAVORITES_PRODUCT,
    allowAuth: true,
    element: <Favorites name={RouteName.FAVORITES_PRODUCT} />,
    breadcrumb: RouteName.FAVORITES_PRODUCT
  },
  // {
  //   path: RoutePath.BASKET,
  //   element: <Basket name={RouteName.BASKET} />,
  //   breadcrumb: RouteName.BASKET
  // },
  {
    path: RoutePath.ALL_ORDERS,
    lazy: true,
    allowAuth: true,
    element: <AllOrders name={RouteName.ALL_ORDERS} />,
    breadcrumb: RouteName.ALL_ORDERS
  },
  {
    path: RoutePath.ADMIN_PANEL,
    lazy: true,
    allowRoles: [RolesName.admin],
    element: <AdminPanel name={RouteName.ADMIN_PANEL} />,
    breadcrumb: RouteName.ADMIN_PANEL
  },
  {
    path: RoutePath.EDIT_CATEGORY,
    lazy: true,
    allowRoles: RolesName.admin,
    element: <EditCategory />,
    breadcrumb: () => (<>{RouteName.EDIT_CATEGORY}</>)
  },
  {
    path: RoutePath.EDIT_USERS,
    lazy: true,
    allowRoles: RolesName.admin,
    element: <EditUsers />,
    breadcrumb: () => (<>{RouteName.EDIT_USERS}</>)
  },
  {
    path: RoutePath.EDIT_CHARACTERISTICS,
    lazy: true,
    allowRoles: RolesName.admin,
    element: <EditCharacteristics />,
    breadcrumb: () => (<>{RouteName.EDIT_CHARACTERISTICS}</>)
  },
  {
    path: RoutePath.EDIT_TYPE_PRICE,
    lazy: true,
    allowRoles: RolesName.admin,
    element: <EditTypePrice />,
    breadcrumb: () => (<>{RouteName.EDIT_TYPE_PRICE}</>)
  },
  {
    path: RoutePath.EDIT_PRODUCTS,
    lazy: true,
    allowRoles: RolesName.admin,
    element: <EditProducts />,
    breadcrumb: () => (<>{RouteName.EDIT_PRODUCTS}</>)
  },
  {
    path: RoutePath.EDIT_ORDERS,
    lazy: true,
    allowRoles: RolesName.admin,
    element: <EditOrders />,
    breadcrumb: () => (<>{RouteName.EDIT_ORDERS}</>)
  },
  {
    path: RoutePath.ERROR_404,
    lazy: true,
    element: <Error404 />,
    breadcrumb: RouteName.ERROR_404
  },
  {
    path: '*',
    element: <Navigate replace to="/404" />,
    breadcrumb: RouteName.ERROR_404
  }
]

const requireAccess = (access: IRequireUser): ReactNode => {
  return <AccessMiddleware allow={access}/>
}

const lazyReturn = (element: ReactNode, lazy: boolean | undefined): ReactNode => {
  if (lazy !== undefined && lazy) {
    return <Suspense fallback={<Loader alwaysShow={true}/>}>{element}</Suspense>
  } else {
    return element
  }
}

const AppRouter = () => {
  return (
    <>
    <Routes>
      {routes.map(route =>
        (route.allowAuth !== undefined ||
          route.allowRoles ||
          route.allowUsers)
          ? (<Route
            key={route.path}
            path={route.path}
            element={requireAccess({
              allowedAuth: route.allowAuth,
              allowedRoles: route.allowRoles,
              allowedUsers: route.allowUsers
            })}
            >
              <Route
                index
                element={lazyReturn(route.element, route.lazy)}
              />
            </Route>)
          : (<Route
              key={route.path}
              path={route.path}
              element={lazyReturn(route.element, route.lazy)}
            />)
      )}
    </Routes>
    </>
  )
}

export default AppRouter
