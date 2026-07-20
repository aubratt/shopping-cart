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
        console.log(docSnap.data());
        setData(docSnap.data());
      } else {
        console.log("No such doc");
      }
    }

    getRewards();
  }, [db, currentUser]);

  if (!data) return <div>Loading...</div>

  return (
    <div className="rewards">
      <p>{data.rewards} points</p>
    </div>
  );
}
