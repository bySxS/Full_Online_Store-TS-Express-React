
export const filterMessage =
  ({ categoryId, filter, price, sort }: {
    filter?: string[],
    price?: number[],
    sort?: string,
    categoryId?: number
  }): string => {
    return (categoryId && categoryId > 0
      ? `в категории с id${categoryId}, `
      : '') +
      (filter && filter[0] !== ''
        ? `c фильтрами (${filter.join(', ')}), `
        : '') +
    ((price && (price[0] > 0 || price.length === 2))
      ? `с ценой от ${price.join(' до ')}, `
      : '') +
    (sort && sort !== ''
      ? `с сортировкой '${sort}', `
      : '')
  }
