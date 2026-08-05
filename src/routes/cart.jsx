import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import firebase from "firebase/compat/app";
import {
  doc,
  increment,
  setDoc,
  updateDoc,
  arrayUnion,
  runTransaction,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

import {
  Frown,
  Minus,
  Plus,
  ShoppingCart,
  Trash,
  Trash2,
  User,
  X,
} from "lucide-react";

import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

export default function Cart() {
  const { db, products, cart, setCart, currentUser } = useOutletContext();
  const navigate = useNavigate();

  const [orderNumber, setOrderNumber] = useState(null);
  const [modal, setModal] = useState(null);

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
  const shipping = subtotal < 100 ? 9.99 : 0;
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = subtotal + shipping + tax;

  function capitalizeString(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
  }

  async function handleCheckout() {
    const auth = getAuth();
    let uid;

    if (auth.currentUser) {
      uid = auth.currentUser.uid;
    } else {
      const result = await signInAnonymously(auth);
      uid = result.user.uid;
    }

    const nextOrderDocRef = doc(db, "orders", "nextOrder");
    const usersDocRef = doc(db, "users", auth.currentUser.uid);
    const today = new Date();

    let newOrderNumber;

    await runTransaction(db, async (transaction) => {
      const ordersDoc = await transaction.get(nextOrderDocRef);
      newOrderNumber = ordersDoc.data().number + 1;
      transaction.update(nextOrderDocRef, { number: newOrderNumber });
    });

    await setDoc(
      usersDocRef,
      {
        rewards: increment(Math.round(10 * subtotal)),
        orders: arrayUnion({
          orderNumber: newOrderNumber,
          date: `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`,
          items: cart,
          subtotal: subtotal,
          shipping: shipping,
          tax: tax,
          total: total,
          rewardsEarned: Math.round(10 * subtotal),
        }),
      },
      { merge: true },
    );

    setCart([]);
    navigate("/checkout");
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
                <div className="cart__item-info">
                  <div className="cart__item-heading">
                    <p>{product.title}</p>
                    <p>${Number(product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="cart__item-options">
                    <div className="cart__item-details">
                      <p>Color: {capitalizeString(item.color)}</p>
                      <p>Size: {item.size.toUpperCase()}</p>
                      <p>Price: ${Number(product.price).toFixed(2)}</p>
                      <div className="cart__item-quantity-wrapper">
                        <p>Quantity:</p>
                        <div className="cart__item-quantity">
                          <button
                            onClick={() =>
                              setCart(
                                cart.map((i) => {
                                  if (item.id === i.id && i.quantity > 1) {
                                    return { ...i, quantity: i.quantity - 1 };
                                  } else return { ...i };
                                }),
                              )
                            }>
                            <Minus width="16px" />
                          </button>
                          <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            onClick={() =>
                              setCart(
                                cart.map((i) => {
                                  if (item.id === i.id) {
                                    return { ...i, quantity: i.quantity + 1 };
                                  } else return { ...i };
                                }),
                              )
                            }>
                            <Plus width="16px" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="cart__item-actions">
                      <button
                        onClick={() =>
                          setCart((prev) => {
                            return prev.filter((i) => item.id !== i.id);
                          })
                        }
                        className="cart__item-delete">
                        <Trash2 />
                      </button>
                    </div>
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
            <p>{cart.length ? `$${subtotal.toFixed(2)}` : "--"}</p>
          </div>
          <div className="cart__order-summary-line">
            <p>Estimated Shipping (free over $100):</p>
            <p>{cart.length ? `$${shipping.toFixed(2)}` : "--"}</p>
          </div>
          <div className="cart__order-summary-line">
            <p>Estimated Tax:</p>
            <p>{cart.length ? `$${tax.toFixed(2)}` : "--"}</p>
          </div>
          <hr />
          <div className="cart__order-estimated-total">
            <p>Estimated Total:</p>
            <p>{cart.length ? `$${total.toFixed(2)}` : "--"}</p>
          </div>
        </div>
        {cart.length > 0 && (
          <div className="cart__checkout">
            {currentUser && !currentUser.isAnonymous ? (
              <button onClick={handleCheckout}>Checkout</button>
            ) : (
              <>
                <button onClick={() => setModal("login")}>
                  Login & Checkout
                </button>
                <button onClick={() => setModal("register")}>
                  Register & Checkout
                </button>
                <button onClick={handleCheckout}>Guest Checkout</button>
              </>
            )}
          </div>
        )}
      </div>

      {modal && (
        <div className="cart__modal-overlay">
          <div className="cart__modal">
            <div className="cart__close-modal">
              <button onClick={() => setModal(null)}>
                <X color="gray" />
              </button>
            </div>

            <div className="cart__modal-form">
              {modal === "login" ? (
                <LoginForm handleSuccess={handleCheckout} />
              ) : (
                <RegisterForm handleSuccess={handleCheckout} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
