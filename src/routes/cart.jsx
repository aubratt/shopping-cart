import { Frown, ShoppingCart } from "lucide-react";
import { useOutletContext } from "react-router-dom";

// Use localforage here for cart data
export default function Cart() {
  const { products, cart, setCart } = useOutletContext();

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(
        products.find((p) => String(p.id) === String(item.productId)).price,
      ) *
        Number(item.quantity),
    0,
  );
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  function capitalizeString(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
  }

  return (
    <div className="cart">
      <div className="cart__summary">
        <div className="cart__heading">
          <h1>Cart ({totalQuantity})</h1>
        </div>
        {!cart.length && (
          <div className="cart__empty">
            <p> Your cart is empty</p>
            <Frown />
          </div>
        )}
        <div className="cart__items">
          {cart.map((item) => {
            const product = products.find(
              (p) => String(p.id) === String(item.productId),
            );
            return (
              <div key={crypto.randomUUID()} className="cart__item">
                <div className="cart__item-image">
                  <div
                    className="cart__item-color"
                    style={{ borderTop: `80px solid ${item.color}` }}></div>
                  <img src={product.image} alt="" />
                </div>
                <div className="cart__item-details">
                  <div className="cart__item-heading">
                    <p>{product.title}</p>
                    <p>${product.price}</p>
                  </div>
                  <div className="cart__item-options">
                    <p>Color: {capitalizeString(item.color)}</p>
                    <p>Size: {item.size.toUpperCase()}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="cart__order-summary">
        <div className="cart__order-summary-heading">
          <h2>Order Summary</h2>
        </div>
        <div className="cart__order-summary-content">
          <div className="cart__order-summary-line">
            <p>Subtotal:</p>
            <p>${subtotal}</p>
          </div>
          <div className="cart__order-summary-line">
            <p>Estimated Shipping (free over $100):</p>
            <p>FREE</p>
          </div>
          <div className="cart__order-summary-line">
            <p>Estimated Tax:</p>
            <p>--</p>
          </div>
          <hr />
          <div className="cart__order-estimated-total">
            <p>Estimated Total:</p>
            <p>${total}</p>
          </div>
        </div>
        <button className="cart__checkout">Checkout</button>
      </div>
    </div>
  );
}
