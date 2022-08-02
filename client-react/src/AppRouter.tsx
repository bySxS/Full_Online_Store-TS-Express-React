import React, { ReactNode, Suspense, lazy, FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from 'pages/Home/Home'
import LoginReg from 'pages/LoginReg/LoginReg'
import Products from 'pages/Products/Products'
import Favorites from 'pages/Favorites/Favorites'
import Users from 'pages/Users/Users'
import Basket from 'pages/Basket/Basket'
import ProductDetails from 'pages/ProductDetails/ProductDetails'
import UserDetails from 'pages/UserDetails/UserDetails'
import AccessMiddleware, { IRequireUser } from 'components/AccessMiddleware/AccessMiddleware'
import Loader from 'components/UI/Loader/Loader'

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
  LOGIN = '/login',
  REGISTRATION = '/registration',
  ADMIN_PANEL = '/admin_panel',
  PRODUCTS = '/products',
  PRODUCTS_ID = '/products/:id',
  FAVORITES_PRODUCT = '/favorites_products',
  USERS = '/users',
  USERS_ID = '/users/:id',
  BASKET = '/basket',
  ALL_ORDERS = '/all_orders'
}

export enum RouteName {
  HOME = 'Главная',
  LOGIN = 'Вход',
  REGISTRATION = 'Регистрация',
  ADMIN_PANEL = 'Админ панель',
  PRODUCTS = 'Товары',
  FAVORITES_PRODUCT = 'Избранные товары',
  USERS = 'Пользователи',
  BASKET = 'Корзина',
  ALL_ORDERS = 'Все заказы'
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
    <span>{id}</span>
  )
}

// мини компонент получения данных о пользователе для breadcrumbs
const UserIDBreadcrumb: FC<IBreadcrumbParams> = ({ match }) => {
  const { id } = match.params
  return (
    <span>{id}</span>
  )
}

// навигация с доступом и lazy
export const routes: IRoute[] = [
  {
    path: RoutePath.HOME,
    element: <Home name={RouteName.HOME} />,
    breadcrumb: () => (<i className="bi bi-house-door-fill"></i>)
  },
  {
    path: RoutePath.LOGIN,
    allowAuth: false,
    element: <LoginReg name={RouteName.LOGIN} />,
    breadcrumb: RouteName.LOGIN
  },
  {
    path: RoutePath.REGISTRATION,
    allowAuth: false,
    element: <LoginReg name={RouteName.REGISTRATION} />,
    breadcrumb: RouteName.REGISTRATION
  },
  {
    path: RoutePath.PRODUCTS,
    element: <Products name={RouteName.PRODUCTS} />,
    breadcrumb: RouteName.PRODUCTS
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
    breadcrumb: RouteName.USERS
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
    <div className={'text-center flex justify-center'}>
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
    </div>
  )
}

export default AppRouter
