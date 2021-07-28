import { getRandomNumber } from './getRandomNumber'

export const getRandomItem = (items: any[]) => {
  return items[getRandomNumber(items.length - 1)]
}