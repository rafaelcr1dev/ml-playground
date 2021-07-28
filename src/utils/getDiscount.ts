export const getDiscount = (productTarget: any, product: any) => {
  if (!productTarget.price || !product.price) return false;

  return Math.floor(parseInt(product.price) / parseInt(productTarget.price) * 100) - 100;
}