import { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export default function Orders() {
  const { db, currentUser } = useOutletContext();

  const [data, setData] = useState(null);

  useEffect(() => {
    async function getOrders() {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data().orders);
      } else {
        console.log("No such doc");
      }
    }

    getOrders();
  }, [db, currentUser]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="orders">
      {data.length > 0 ? (
        data
          .map((order) => {
            const totalQuantity = order.items.reduce(
              (total, item) => total + item.quantity,
              0,
            );

            return (
              <Link
                to={`/profile/orders/${order.orderNumber}`}
                key={crypto.randomUUID()}
                className="orders__order">
                <div className="orders__order-line">
                  <p>Order #{order.orderNumber}</p>
                  <p>{order.date}</p>
                </div>
                <div className="orders__order-line">
                  <p>{totalQuantity} items</p>
                  <p>${order.total.toFixed(2)}</p>
                </div>
              </Link>
            );
          })
          .reverse()
      ) : (
        <p>No orders</p>
      )}
    </div>
  );
}
