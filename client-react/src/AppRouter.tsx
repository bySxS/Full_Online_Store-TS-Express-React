import React, { ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from 'pages/Home/Home'
import LoginReg from 'pages/LoginReg/LoginReg'
import Product from 'pages/Product/Product'
import Favorites from 'pages/Favorites/Favorites'
import Users from 'pages/Users/Users'
import Basket from 'pages/Basket/Basket'
import AdminPanel from 'pages/AdminPanel/AdminPanel'
import AllOrders from 'pages/AllOrders/AllOrders'
import ProductDetails from 'pages/ProductDetails/ProductDetails'
import UserDetails from 'pages/UserDetails/UserDetails'

export interface IRoute {
  path: string
  element: ReactNode
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
  PRODUCTS_ID = '',
  FAVORITES_PRODUCT = 'Избранные товары',
  USERS = 'Пользователи',
  USERS_ID = '',
  BASKET = 'Корзина',
  ALL_ORDERS = 'Все заказы'
}

export const routes: IRoute[] = [
  { path: RoutePath.HOME, element: <Home name={RouteName.HOME} /> },
  { path: RoutePath.LOGIN_REGISTRATION, element: <LoginReg name={RouteName.LOGIN_REGISTRATION} /> },
  { path: RoutePath.PRODUCTS, element: <Product name={RouteName.PRODUCTS} /> },
  { path: RoutePath.PRODUCTS_ID, element: <ProductDetails name={RouteName.PRODUCTS_ID} /> },
  { path: RoutePath.FAVORITES_PRODUCT, element: <Favorites name={RouteName.FAVORITES_PRODUCT} /> },
  { path: RoutePath.USERS, element: <Users name={RouteName.USERS} /> },
  { path: RoutePath.USERS_ID, element: <UserDetails name={RouteName.USERS_ID} /> },
  { path: RoutePath.BASKET, element: <Basket name={RouteName.BASKET} /> },
  { path: RoutePath.ALL_ORDERS, element: <AllOrders name={RouteName.ALL_ORDERS} /> },
  { path: RoutePath.ADMIN_PANEL, element: <AdminPanel name={RouteName.ADMIN_PANEL} /> }
]

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(route =>
      <Route
        key={route.path}
        path={route.path}
        element={route.element}
      />
      )}
    </Routes>
  )
}

export default AppRouter
