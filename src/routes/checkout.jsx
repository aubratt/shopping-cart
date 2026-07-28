import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Checkout() {
  const { db, currentUser, products } = useOutletContext();
  
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getOrderInfo() {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data().orders[docSnap.data().orders.length - 1]);
      } else {
        console.log("No such doc");
      }
    }

    getOrderInfo();
  }, [db, currentUser]);

  function capitalizeString(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
  }

  if (!data) return <div>Processing...</div>;

  return (
    <div className="checkout">
      <div className="checkout__heading">
        <h1>Checkout</h1>
        <p>
          Thank you for your purchase. You earned {data.rewardsEarned} rewards
          points!
        </p>
      </div>
      <div className="checkout__info">
        <div className="checkout__confirmation">
          <div className="checkout__confirmation-section">
            <p className="checkout__confirmation-section-heading">
              Order Number
            </p>
            <p>{data.orderNumber}</p>
          </div>
          <div className="checkout__confirmation-section">
            <p className="checkout__confirmation-section-heading">
              Order Placed
            </p>
            <p className="checkout__confirmation-date">{data.date}</p>
          </div>
        </div>
        <div className="checkout__items">
          <div className="checkout__items-list">
            {data.items.map((item) => {
              const product = products.find(
                (p) => String(p.id) === String(item.productId),
              );
              return (
                <div key={crypto.randomUUID()} className="checkout__item">
                  <div className="checkout__item-image">
                    <div
                      className="checkout__item-color"
                      style={{ borderTop: `80px solid ${item.color}` }}></div>
                    <img src={product.image} alt="" />
                  </div>
                  <div className="checkout__item-info">
                    <div className="checkout__item-heading">
                      <p>{product.title}</p>
                      <p>${Number(product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="checkout__item-details">
                      <p>Color: {capitalizeString(item.color)}</p>
                      <p>Size: {item.size.toUpperCase()}</p>
                      <p>Price: ${Number(product.price).toFixed(2)}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="checkout__summary">
          <p>Subtotal: ${Number(data.subtotal).toFixed(2)}</p>
          <p>Shipping: ${Number(data.shipping).toFixed(2)}</p>
          <p>Tax: ${Number(data.tax).toFixed(2)}</p>
          <p className="checkout__total">
            Total: ${Number(data.total).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
