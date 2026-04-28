import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="announcement-bar">
        <p className="announcement-bar__text">
          Free shipping on orders over $100
        </p>
      </div>
      <div className="nav-bar">
        <div className="nav-bar__logo">
          <p>Logo</p>
        </div>
        <div className="nav-bar__links">
          <p>Men</p>
          <p>Women</p>
          <p>Jewelry</p>
          <p>Electronics</p>
          
        </div>
        <div className="nav-bar__utility">
          <p>Account</p>
          <p>Cart</p>
        </div>
      </div>
      <Outlet />
    </>
  );
}
