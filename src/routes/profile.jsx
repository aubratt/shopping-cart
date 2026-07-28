import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const { db, currentUser } = useOutletContext();

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
              location.pathname.includes("/profile/orders")
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
      </div>
      <Outlet context={{ db, currentUser }} />
    </div>
  );
}
