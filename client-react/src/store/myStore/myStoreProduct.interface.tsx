import { ICharacteristicSection } from './myStoreCharacteristics.interface'

export interface IProduct {
  id: number
  title: string
  categoryId: number
  userId: number
  description: string
  count: number
  priceTypeId: number
  availability: number
  screen: string
  image1: string
  image2: string
  image3: string
  image4: string
  image5: string
  image6: string
  image7: string
  image8: string
  image9: string
  image10: string
  videoYoutubeUrl: string
  parentId?: number
  url: string
  createdAt: Date | string
  updatedAt: Date | string
  view: number
  rating?: number
  reviewCount: number
  ratingPlus: number
  ratingMinus: number
  countInFavorites: number
  priceId: number
  price: number
  priceCurrency: string
  priceType: string
  priceFirstId: number
  priceFirst: number
  priceFirstCurrency: string
  categoryName: string
  sectionId: number
  sectionName: string
  characteristics?: ICharacteristicSection[]
  parentProduct?: IProduct
}

export type TSortProduct = 'price_asc' | 'price_desc' |
  'id_desc' | 'views_desc' | 'rating_desc' | 'favorites_desc' | ''

export interface IGetProductsWithFilter {
  categoryId?: number
  filter?: string
  price?: string
  sort?: TSortProduct
  limit?: number
  page: number
}

export interface IProductIn {
  id: number,
  title: string,
  categoryId: number,
  userId: number,
  description: string
  count: number
  price: number
  priceTypeId: number
  availability: boolean
  screen: File | null
  image1?: File | null
  image2?: File | null
  image3?: File | null
  image4?: File | null
  image5?: File | null
  image6?: File | null
  image7?: File | null
  image8?: File | null
  image9?: File | null
  image10?: File | null
  delScreen?: boolean
  delImage1?: boolean
  delImage2?: boolean
  delImage3?: boolean
  delImage4?: boolean
  delImage5?: boolean
  delImage6?: boolean
  delImage7?: boolean
  delImage8?: boolean
  delImage9?: boolean
  delImage10?: boolean
  videoYoutubeUrl?: string
  parentId?: number
  url?: string
}

export interface IDynamicPrice {
  price: number
  updatedAt: Date | string
}

export interface IFilterState {
  filter?: string
  price?: string
  sort?: TSortProduct
  categoryId?: number
}
