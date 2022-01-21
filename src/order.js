import { callApi } from "./api";

function totalPrice(products) {
  return products.reduce((tally, { price, count }) => tally + price * count, 0);
}

function selectDiscount(total, coupon) {
  let discount = 0;
  switch (coupon) {
    case "HAPPY_MONDAY":
      discount = Math.min(total, 20);
      break;
    case "LAZY_FRIDAY":
      discount = total * 0.2;
      break;
    default:
      discount = 0;
  }
  return discount;
}

function isCartEmpty(cart) {
  return !cart.products.length;
}

export async function makePurchase({ user, cart, coupon }) {
  if (isCartEmpty(cart)) throw new Error("The cart is empty.");
  if (user.account < totalPrice(cart.products)) {
    throw new Error("Not enough money.");
  }

  const _userId = user.name;
  const products = cart.products;
  const total = totalPrice(products);
  const discount = selectDiscount(total, coupon);

  const order = {
    user: _userId,
    products,
    total,
    discount,
  };

  return await callApi(order);
}
