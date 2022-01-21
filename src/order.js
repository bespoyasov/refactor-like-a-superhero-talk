export async function makePurchase({ user, cart, coupon }) {
  if (!cart.products.length) throw new Error("The cart is empty.");
  if (
    user.account <
    cart.products.reduce((t, { price, count }) => t + price * count, 0)
  ) {
    throw new Error("Not enough money.");
  }

  const _userId = user.name;
  const products = cart.products;
  const total = products.reduce(
    (tally, { price, count }) => tally + price * count,
    0
  );

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

  // Pretend like this is an API call =)
  return await new Promise((resolve) => {
    setTimeout(() => {
      console.log(order);
      resolve("some-order-id");
    }, 500);
  });
}
