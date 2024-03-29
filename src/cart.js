import { useState } from "react";

const cart_ = {
  products: [
    { name: "Unicorn", icon: "🦄", price: 50, count: 1 },
    { name: "Magic Sparkles", icon: "✨", price: 10, count: 3 },
    { name: "Rainbow", icon: "🌈", price: 150, count: 1 },
    { name: "Space Invader", icon: "👾", price: 15, count: 4 },
  ],
};

export function useCartStore() {
  const [cart, setCart] = useState(cart_);
  return { cart, setCart };
}

export function isEmpty(cart) {
  return !cart.products.length;
}

export { cart_ as cartStub };
