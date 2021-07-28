import { formatMoney } from './formatMoney'

export const serializeProducts = (product: any) => {
  const {
    id,
    price,
    original_price,
    condition,
    thumbnail,
    title,
    discount,
    permalink
  } = product;

  return {
    id,
    title: title,
    formatted_price: formatMoney(price),
    formatted_original_price: (original_price) ? formatMoney(original_price) : "",
    condition: (condition === "new") ? "Novo" : "Usado",
    thumbnail,
    image: thumbnail.replace('-I.jpg','-O.jpg'),
    discount,
    price,
    original_price,
    permalink
  }
}