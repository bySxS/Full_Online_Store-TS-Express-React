import { useMemo } from 'react'
import selectUser from 'store/user/user.selector'
import selectBasket from 'store/basket/basket.selector'
import selectProduct from 'store/product/product.selector'
import selectCategory from '../store/category/category.selector'
import { useAppSelector } from './useStore'

export const useAuth = () => {
  const user = useAppSelector(selectUser.currentUser)
  const roles = useAppSelector(selectUser.currentRoles)
  const isActivated = useAppSelector(selectUser.userIsActivated)
  const nickname = useAppSelector(selectUser.nickname)
  const avatarUrl = useAppSelector(selectUser.avatarUrl)
  const isAuth = useAppSelector(selectUser.isAuth)
  const isUser = useAppSelector(selectUser.isUser)
  const isModer = useAppSelector(selectUser.isModer)
  const isAdmin = useAppSelector(selectUser.isAdmin)
  const myId = useAppSelector(selectUser.myId)
  return useMemo(() => ({
    user,
    roles,
    isActivated,
    nickname,
    avatarUrl,
    isAuth,
    isUser,
    isModer,
    isAdmin,
    myId
  }), [
    user, roles, isActivated, nickname, avatarUrl,
    isAuth, isUser, isModer, isAdmin, myId
  ])
}

export const useBasket = () => {
  const basketProduct = useAppSelector(selectBasket.basketProduct)
  const countProductInBasket = useAppSelector(selectBasket.countProductInBasket)
  const needSyncBasket = useAppSelector(selectBasket.needSyncBasket)
  const basketProductFullInfo = useAppSelector(selectBasket.basketProductFullInfo)
  const basketPrice = useAppSelector(selectBasket.basketPrice)
  return useMemo(() => ({
    basketProduct,
    countProductInBasket,
    needSyncBasket,
    basketProductFullInfo,
    basketPrice
  }), [
    basketProduct, countProductInBasket,
    needSyncBasket, basketProductFullInfo, basketPrice
  ])
}

export const useProducts = () => {
  const viewProducts = useAppSelector(selectProduct.viewProducts)
  const allProducts = useAppSelector(selectProduct.allProducts)
  const allFavProducts = useAppSelector(selectProduct.allFavProducts)
  const isApplyFilter = useAppSelector(selectProduct.isApplyFilter)
  const countProducts = useAppSelector(selectProduct.countProducts)
  const countFavProducts = useAppSelector(selectProduct.countFavProducts)
  const pageFavProduct = useAppSelector(selectProduct.pageFavProduct)
  const pageProduct = useAppSelector(selectProduct.pageProduct)
  const totalProduct = useAppSelector(selectProduct.totalProduct)
  const totalFavProduct = useAppSelector(selectProduct.totalFavProduct)
  const filterState = useAppSelector(selectProduct.filterState)

  const allCategory = useAppSelector(selectCategory.allCategory)
  const categoryList = useAppSelector(selectCategory.categoryList)
  const showCategory = useAppSelector(selectCategory.showCategory)
  return useMemo(() => ({
    viewProducts,
    allProducts,
    allFavProducts,
    isApplyFilter,
    countProducts,
    countFavProducts,
    pageFavProduct,
    pageProduct,
    totalProduct,
    totalFavProduct,
    filterState,
    allCategory,
    categoryList,
    showCategory
  }), [
    viewProducts, allProducts, allFavProducts, isApplyFilter,
    countProducts, countFavProducts, pageFavProduct, pageProduct,
    totalProduct, totalFavProduct, filterState,
    allCategory, categoryList, showCategory
  ])
}
