import { useState } from "react";

import { useCartStore } from "./cart";
import { useUserStore } from "./user";
import { makePurchase } from "./order";

import { robustAsync } from "./utils";
import { purchaseApi as service } from "./api";

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

const safeMakePurchase = robustAsync(makePurchase);

function useMakePurchaseExecutor() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  async function execute(command) {
    setStatus("loading");
    const result = await safeMakePurchase({ ...command, service });

    if (result.value) alert(`Your order ID is ${result.value}!`);
    if (result.error) setError("Woah! Something went terribly wrong!");
    setStatus("finished");
  }

  return { execute, status, error };
}

function App() {
  const { user } = useUserStore();
  const { cart } = useCartStore();
  const { execute, status, error } = useMakePurchaseExecutor();

  if (!!error) return error;
  if (status === "loading") return "Loading...";
  if (status === "finished") return "We'll call you to confirm the order.";

  function handleSubmit(e) {
    e.preventDefault();
    const { coupon } = Object.fromEntries(new FormData(e.target));
    const makePurchaseCommand = { user, cart, coupon };
    execute(makePurchaseCommand);
  }

  return (
    <form onSubmit={handleSubmit}>
      <UserInfo user={user} />
      <ProductList products={cart.products} />
      <Coupon />
      <button>Purchase</button>
    </form>
  );
}

export default App;
