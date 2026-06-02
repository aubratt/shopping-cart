import { useNavigate, useOutletContext } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function Profile() {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  function handleLogOut() {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }

  return (
    <div className="profile">
      <h1>Hi, {user.displayName}</h1>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}
