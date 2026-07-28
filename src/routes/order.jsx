import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";

export default function Order() {
  const { db, currentUser, products } = useOutletContext();
  const { orderNumber } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    async function getOrderInfo() {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(
          docSnap
            .data()
            .orders.find(
              (order) => Number(order.orderNumber) === Number(orderNumber),
            ),
        );
      } else {
        console.log("No such doc");
      }
    }

    getOrderInfo();
  }, []);

  function capitalizeString(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
  }

  if (!data) return <div>Loading...</div>;

  return (
    <div className="order">
      <Link to="/profile/orders" className="order__back">
        <ArrowLeft size={"20px"} />
        <p>Back to Orders</p>
      </Link>
      <div className="order__receipt">
        <div className="order__info">
          <div className="order__confirmation">
            <div className="order__confirmation-section">
              <p className="order__confirmation-section-heading">
                Order Number
              </p>
              <p>{data.orderNumber}</p>
            </div>
            <div className="order__confirmation-section">
              <p className="order__confirmation-section-heading">
                Order Placed
              </p>
              <p className="order__confirmation-date">{data.date}</p>
            </div>
          </div>
        </div>
        <div className="order__items">
          <div className="order__items-list">
            {data.items.map((item) => {
              const product = products.find(
                (p) => String(p.id) === String(item.productId),
              );
              return (
                <div key={crypto.randomUUID()} className="order__item">
                  <div className="order__item-heading">
                    <p>{product.title}</p>
                    <p>${Number(product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="order__item-info">
                    <div className="order__item-image">
                      <div
                        className="order__item-color"
                        style={{ borderTop: `80px solid ${item.color}` }}></div>
                      <img src={product.image} alt="" />
                    </div>
                    <div className="order__item-details">
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
        <div className="order__summary">
          <p>Subtotal: ${Number(data.subtotal).toFixed(2)}</p>
          <p>Shipping: ${Number(data.shipping).toFixed(2)}</p>
          <p>Tax: ${Number(data.tax).toFixed(2)}</p>
          <p className="order__total">
            Total: ${Number(data.total).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
