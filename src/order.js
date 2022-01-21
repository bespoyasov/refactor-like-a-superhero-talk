import { callApi } from "./api";

function totalPrice(products) {
  return products.reduce((tally, { price, count }) => tally + price * count, 0);
}

export async function makePurchase({ user, cart, coupon }) {
  if (!cart.products.length) throw new Error("The cart is empty.");
  if (user.account < totalPrice(cart.products)) {
    throw new Error("Not enough money.");
  }

  const _userId = user.name;
  const products = cart.products;
  const total = totalPrice(products);

  let discount = 0;
  switch (coupon) {
    case "HAPPY_MONDAY":
      discount = total > 20 ? 20 : total;
      break;
    case "LAZY_FRIDAY":
      discount = total * 0.2;
      break;
    default:
      discount = 0;
  }

  const order = {
    user: _userId,
    products,
    total,
    discount,
  };

  return await callApi(order);
}
