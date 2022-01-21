import { totalPrice } from "./product";
import { isEmpty } from "./cart";
import { callApi } from "./api";

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

function userHasEnoughMoney(user, cart) {
  return user.account >= totalPrice(cart.products);
}

function createOrder({ user, cart }) {
  const userName = user.name;
  const products = cart.products;
  const total = totalPrice(products);

  return {
    user: userName,
    products,
    total,
  };
}

function applyCoupon({ order, coupon }) {
  return { ...order, discount: selectDiscount(order.total, coupon) };
}

export async function makePurchase({ user, cart, coupon }) {
  if (isEmpty(cart)) throw new Error("The cart is empty.");
  if (!userHasEnoughMoney(user, cart)) throw new Error("Not enough money.");

  const created = createOrder({ user, cart });
  const discounted = applyCoupon({ order: created, coupon });
  return await callApi(discounted);
}
