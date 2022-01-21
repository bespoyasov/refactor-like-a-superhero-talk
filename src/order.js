import { totalPrice } from "./product";
import { isEmpty } from "./cart";

function selectDiscount(total, coupon) {
  const zeroDiscount = 0;
  const couponDiscounts = {
    HAPPY_MONDAY: Math.min(total, 20),
    LAZY_FRIDAY: total * 0.2,
  };

  return couponDiscounts[coupon] ?? zeroDiscount;
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

export async function makePurchase({ user, cart, coupon, service }) {
  if (isEmpty(cart)) throw new Error("The cart is empty.");
  if (!userHasEnoughMoney(user, cart)) throw new Error("Not enough money.");

  const created = createOrder({ user, cart });
  const discounted = applyCoupon({ order: created, coupon });
  return await service.sendOrder(discounted);
}
