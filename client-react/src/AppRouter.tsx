import React, { ReactNode, Suspense, lazy } from 'react'
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
}

export enum RoutePath {
  HOME = '/',
  LOGIN_REGISTRATION = '/login_reg',
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
  LOGIN_REGISTRATION = 'Логин / Регистрация',
  ADMIN_PANEL = 'Админ панель',
  PRODUCTS = 'Товары',
  // PRODUCTS_ID = '',
  FAVORITES_PRODUCT = 'Избранные товары',
  USERS = 'Пользователи',
  // USERS_ID = '',
  BASKET = 'Корзина',
  ALL_ORDERS = 'Все заказы'
}

// навигация с доступом и lazy
const routes: IRoute[] = [
  { path: RoutePath.HOME, element: <Home name={RouteName.HOME} /> },
  { path: RoutePath.LOGIN_REGISTRATION, allowAuth: false, element: <LoginReg name={RouteName.LOGIN_REGISTRATION} /> },
  { path: RoutePath.PRODUCTS, element: <Products name={RouteName.PRODUCTS} /> },
  { path: RoutePath.PRODUCTS_ID, element: <ProductDetails /> },
  { path: RoutePath.FAVORITES_PRODUCT, allowAuth: true, element: <Favorites name={RouteName.FAVORITES_PRODUCT} /> },
  { path: RoutePath.USERS, allowRoles: RolesName.admin, element: <Users name={RouteName.USERS} /> },
  // { path: RoutePath.USERS_ID, element: <UserDetails name={RouteName.USERS_ID} /> },
  { path: RoutePath.BASKET, element: <Basket name={RouteName.BASKET} /> },
  { path: RoutePath.ALL_ORDERS, lazy: true, allowAuth: true, element: <AllOrders name={RouteName.ALL_ORDERS} /> },
  { path: RoutePath.ADMIN_PANEL, lazy: true, allowRoles: [RolesName.admin], element: <AdminPanel name={RouteName.ADMIN_PANEL} /> }
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
    <div className={'p-4'}>
    <Routes>
      {routes.map(route =>
        (route.allowAuth !== undefined ||
          route.allowRoles ||
          route.allowUsers)
          ? (<Route
            key={route.path}
            element={requireAccess({
              allowedAuth: route.allowAuth,
              allowedRoles: route.allowRoles,
              allowedUsers: route.allowUsers
            })}
            >
              <Route
                path={route.path}
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
