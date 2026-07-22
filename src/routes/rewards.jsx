import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Rewards() {
  const { db, currentUser } = useOutletContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getRewards() {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such doc");
      }
    }

    getRewards();
  }, [db, currentUser]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="rewards">
      <div className="rewards__current-balance">
        <h2>Current Balance</h2>
        <p>
          <span className="rewards__points">{data.rewards}</span>{" "}
          <span>points</span>
        </p>
      </div>
      <div className="rewards__how-it-works">
        <h2>How It Works</h2>
        <p>
          Earn 10 rewards points for every dollar you spend (not including
          shipping and tax)
        </p>
      </div>
    </div>
  );
}
