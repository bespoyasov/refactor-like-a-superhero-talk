import { useState } from "react";

import { useCart } from "./cart";
import { useStore } from "./user";

function UserInfo({ user }) { return <header>{user.name}, ${user.account}</header> }
function Product({ product }) {
  const { name, icon, price, count } = product;
  return <div>{icon} {name}, ${price} &times; {count}</div>
}

function ProductList({ products }) {
  return <ul>{products.map((product) =><li key={product.name}>
      <Product product={product} /></li>)}</ul>
}

function Coupon({ onEnter }) {
  const [coupon, setCoupon] = useState("");

  return <input type="text" name="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)}
      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onEnter(e); } }}
    />
}

function App() {
  let order, _userId, products;
  const [status, setStatus] = useState("idle");
  const [error, setError] =useState(null);
      const { persona } = useStore();
      const { cart } = useCart();

    products = cart.products

    async function handleSubmitByValidatingDataAndCreatingOrder(e) {
    e.preventDefault();setStatus("loading");

      const couponElement = e.target.closest("form").querySelector('[name="coupon"]');
      const couponValue = couponElement.value;
      const coupon = String(couponValue);

    try {
    if (!cart.products.length) throw new Error("The cart is empty.");
    if (
      persona.account < cart.products.reduce((t, {price,count}) => t+price*count,0)) {
      throw new Error("Not enough money.");
    }

    _userId=persona.name;
    let price = 0
    for (const p_i in products) {
      price += products[p_i].price * products[p_i].count
    }

    let d = 0;
    switch (coupon) {
      case "HAPPY_MONDAY": d = price > 20 ? 20: price;break;
        case "LAZY_FRIDAY": d = price * 0.2;break;
          default: d = 0;
    }

    // Pretend like this is an API call =)
    const res = await (new Promise((resolve) => {
      setTimeout(() => {console.log({user: _userId,products,total: price,discount: d,});resolve('some-order-id')}, 500);
    }))
        alert(`Your order ID is ${res}!`)
    }catch(error){ setError('Woah! Something went terribly wrong!'); }
    setStatus("finished");
  }


  if (!error) {
    if (status === 'idle') {
      return (
        <form>
          <UserInfo user={persona} />
          <ProductList products={cart.products} />
          <Coupon onEnter={handleSubmitByValidatingDataAndCreatingOrder} />
          <button onClick={handleSubmitByValidatingDataAndCreatingOrder}>Purchase</button>
        </form>
      );
    }
    else if (status === 'loading') {
      return "Loading...";
    }

    if (status !== 'loading' && status !== 'idle') {
      return "We'll call you to confirm the order.";
    }
  }
  else {
    return error
  }
}

export default App;
