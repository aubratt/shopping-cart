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

  console.log(data);

  if (!data) return <div>Processing...</div>;

  return (
    <div className="checkout">
      <div className="checkout__heading">
        <h1>Checkout</h1>
      </div>
      <div className="checkout__info">
        <p>
          Thank you for your purchase. You earned {data.rewardsEarned} rewards
          points!
        </p>
        <p>Order Number: {data.orderNumber}</p>
        <p>Order Date: {data.date}</p>
        <p>Order Time: {data.time}</p>
        <div className="checkout__items">
          <p>Items</p>
          <div className="checkout__items-list">
            {data.items.map((item) => {
              const product = products.find(
                (p) => String(p.id) === String(item.productId),
              );
              return (
                <div key={crypto.randomUUID()}>
                  <p>Item: {product.title}</p>
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
                  <p>Price: {product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="checkout__summary">
          <p>Subtotal: {data.subtotal}</p>
          <p>Shipping (free over $100): {data.shipping}</p>
          <p>Tax: {data.tax}</p>
          <p>Total: {data.total}</p>
        </div>
      </div>
    </div>
  );
}
