import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function Profile() {
  const location = useLocation();
  console.log(location);
  const { currentUser } = useOutletContext();
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
      <div className="profile__navbar">
        <div className="profile__pages">
          <Link
            to="/profile/account"
            className={
              location.pathname === "/profile/account"
                ? "profile__current-page"
                : "profile__page"
            }>
            Account
          </Link>
          <Link
            to="/profile/rewards"
            className={
              location.pathname === "/profile/rewards"
                ? "profile__current-page"
                : "profile__page"
            }>
            Rewards
          </Link>
          <Link
            to="/profile/orders"
            className={
              location.pathname === "/profile/orders"
                ? "profile__current-page"
                : "profile__page"
            }>
            Orders
          </Link>
          <Link
            to="/profile/inventory"
            className={
              location.pathname === "/profile/inventory"
                ? "profile__current-page"
                : "profile__page"
            }>
            Inventory
          </Link>
        </div>
        <div className="profile__logout">
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
      <Outlet context={{ currentUser }} />
    </div>
  );
}
