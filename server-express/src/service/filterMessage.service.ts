
export const filterMessage =
  (filter: string[],
    price: number[],
    sortBy: string): string => {
    return (filter[0] !== ''
      ? `c фильтрами (${filter.join(', ')}), `
      : '') +
    (price[0] !== 0
      ? `цены от ${price.join(' до ')}, `
      : '') +
    (sortBy !== ''
      ? `сортировкой '${sortBy}', `
      : '')
  }
