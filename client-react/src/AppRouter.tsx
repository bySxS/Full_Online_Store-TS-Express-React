import React, { ReactNode, Suspense, lazy, FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from 'pages/Home/Home'
import Products from 'pages/Products/Products'
import Favorites from 'pages/Favorites/Favorites'
import Users from 'pages/Users/Users'
import Basket from 'pages/Basket/Basket'
import ProductDetails from 'pages/ProductDetails/ProductDetails'
import UserDetails from 'pages/UserDetails/UserDetails'
import AccessMiddleware, { IRequireUser } from 'components/AccessMiddleware/AccessMiddleware'
import Loader from 'components/UI/Loader/Loader'
import ActivateEmail from 'pages/ActivateEmail/ActivateEmail'
import Error404 from 'pages/Error404/Error404'
import ProductsCategory from 'pages/ProductsCategory/ProductsCategory'

// test динамической подгрузки
const AdminPanel = lazy(() => import('pages/AdminPanel/AdminPanel'))
const AllOrders = lazy(() => import('pages/AllOrders/AllOrders'))

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
  ADMIN_PANEL = '/admin_panel',
  PRODUCTS = '/products',
  PRODUCTS_CATEGORY = '/products/category/:id',
  PRODUCTS_ID = '/products/:id',
  FAVORITES_PRODUCT = '/favorites_products',
  USERS = '/admin_panel/users',
  USERS_ID = '/users/:id',
  BASKET = '/basket',
  ALL_ORDERS = '/all_orders',
  ERROR_404 = '/404'
}

export enum RouteName {
  HOME = 'Главная',
  // LOGIN = 'Вход',
  ACTIVATE_EMAIL = 'Активация e-mail',
  ADMIN_PANEL = 'Админ панель',
  PRODUCTS = 'Товары',
  PRODUCTS_CATEGORY = 'Товары категории',
  FAVORITES_PRODUCT = 'Избранные товары',
  USERS = 'Пользователи',
  BASKET = 'Корзина',
  ALL_ORDERS = 'Все заказы',
  ERROR_404 = 'Ошибка 404'
}

interface IBreadcrumbParams {
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
const UserIDBreadcrumb: FC<IBreadcrumbParams> = ({ match }) => {
  const { id } = match.params
  return (
    <span>Пользователь {id}</span>
  )
}

// мини компонент получения данных о пользователе для breadcrumbs
const ProductsCategoryIDBreadcrumb: FC<IBreadcrumbParams> = ({ match }) => {
  const { id } = match.params
  return (
    <span>Товары категории {id}</span>
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
    element: <ProductsCategory name={RouteName.PRODUCTS_CATEGORY} />,
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
  {
    path: RoutePath.USERS,
    allowRoles: RolesName.admin,
    element: <Users name={RouteName.USERS} />,
    breadcrumb: () => (<>{RouteName.USERS}</>)
  },
  {
    path: RoutePath.USERS_ID,
    element: <UserDetails />,
    breadcrumb: UserIDBreadcrumb
  },
  {
    path: RoutePath.BASKET,
    element: <Basket name={RouteName.BASKET} />,
    breadcrumb: RouteName.BASKET
  },
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
