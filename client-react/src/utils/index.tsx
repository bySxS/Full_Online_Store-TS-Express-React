import { IProduct } from 'store/myStore/myStoreProduct.interface'

function div (val: number, by: number): number {
  return (val - val % by) / by
}

export const calcSizeFile = (size: number) => {
  return size < 1000000
    ? `${Math.floor(size / 1000)} KB`
    : `${Math.floor(size / 1000000)} MB`
}
/*  fileName = например 'file.jpg' без /
*   id - сущности
*   additionalPath - путь, в начало и конец писать / не нужно
*/
export const addHostServerToFileLink =
  (fileName: string = '', id: number = 0, additionalPath: string = '') => {
    if (fileName === '') {
      return ''
    }
    const urlServer =
      process.env.REACT_APP_URL_SERVER
    let path = ''
    if (additionalPath !== '') {
      path = additionalPath
    }
    if (id > 0) {
      path = path + '/' + div(id, 100) + '/'
    }
    return urlServer + path + fileName
  }

export const addDomainToImgProducts = (products: IProduct[]): IProduct[] => {
  return products.map(product => ({
    ...product,
    screen: addHostServerToFileLink(product.screen, product.id, 'products_pic'),
    image1: addHostServerToFileLink(product.image1, product.id, 'products_pic'),
    image2: addHostServerToFileLink(product.image2, product.id, 'products_pic'),
    image3: addHostServerToFileLink(product.image3, product.id, 'products_pic'),
    image4: addHostServerToFileLink(product.image4, product.id, 'products_pic'),
    image5: addHostServerToFileLink(product.image5, product.id, 'products_pic'),
    image6: addHostServerToFileLink(product.image6, product.id, 'products_pic'),
    image7: addHostServerToFileLink(product.image7, product.id, 'products_pic'),
    image8: addHostServerToFileLink(product.image8, product.id, 'products_pic'),
    image9: addHostServerToFileLink(product.image9, product.id, 'products_pic'),
    image10: addHostServerToFileLink(product.image10, product.id, 'products_pic')
  }))
}
