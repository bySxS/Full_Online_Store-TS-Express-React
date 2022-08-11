
export const filterMessage =
  (filter: string[],
    price: number[],
    sortBy: string): string => {
    return (filter[0] !== ''
      ? `c фильтрами (${filter.join(', ')}), `
      : '') +
    ((price[0] > 0 || price.length === 2)
      ? `с ценой от ${price.join(' до ')}, `
      : '') +
    (sortBy !== ''
      ? `с сортировкой '${sortBy}', `
      : '')
  }
