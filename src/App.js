import { useState } from "react";

import { useCart } from "./cart";
import { useUserStore } from "./user";

function UserInfo({ user }) {
  return (
    <header>
      {user.name}, ${user.account}
    </header>
  );
}
function Product({ product }) {
  const { name, icon, price, count } = product;
  return (
    <div>
      {icon} {name}, ${price} &times; {count}
    </div>
  );
}

function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.name}>
          <Product product={product} />
        </li>
      ))}
    </ul>
  );
}

function Coupon({ onEnter }) {
  const [coupon, setCoupon] = useState("");

  return (
    <input
      type="text"
      name="coupon"
      value={coupon}
      onChange={(e) => setCoupon(e.target.value)}
    />
  );
}

function App() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const { user } = useUserStore();
  const { cart } = useCart();

  async function handleSubmitByValidatingDataAndCreatingOrder(e) {
    e.preventDefault();
    setStatus("loading");

    const { coupon } = Object.fromEntries(new FormData(e.target));

    try {
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

      // Pretend like this is an API call =)
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          console.log({
            user: _userId,
            products,
            total,
            discount,
          });
          resolve("some-order-id");
        }, 500);
      });
      alert(`Your order ID is ${res}!`);
    } catch (error) {
      setError("Woah! Something went terribly wrong!");
    }
    setStatus("finished");
  }

  if (!error) {
    if (status === "idle") {
      return (
        <form onSubmit={handleSubmitByValidatingDataAndCreatingOrder}>
          <UserInfo user={user} />
          <ProductList products={cart.products} />
          <Coupon />
          <button>Purchase</button>
        </form>
      );
    } else if (status === "loading") {
      return "Loading...";
    }

    if (status !== "loading" && status !== "idle") {
      return "We'll call you to confirm the order.";
    }
  } else {
    return error;
  }
}

export default App;
