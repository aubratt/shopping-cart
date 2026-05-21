import { useOutletContext } from "react-router-dom";

// Use localforage here for cart data
export default function Cart() {
  const { products, cart, setCart } = useOutletContext();

  return (
    <div className="cart">
      <h1>Cart</h1>
      <div>
        {cart.map((item) => {
          const product = products.find(
            (p) => String(p.id) === String(item.productId),
          );

          return (
            <div>
              <p>{product.title}</p>
              <p>{item.color}</p>
              <p>{item.size}</p>
              <p>{item.quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
