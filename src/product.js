export function totalPrice(products) {
  return products.reduce((tally, { price, count }) => tally + price * count, 0);
}
