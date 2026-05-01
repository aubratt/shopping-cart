import { Link } from "react-router-dom";
import { ShoppingCart, SquareUserRound } from "lucide-react";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <div className="nav-bar__business">
        <Link to="/" className="nav-bar__logo">
          ODINSTORE
        </Link>
        <Link to="company/about">About</Link>
        <Link to="help/contact">Contact</Link>
      </div>
      <div className="nav-bar__links">
        <Link to="shop/men">Men</Link>
        <Link to="shop/women">Women</Link>
        <Link to="shop/jewelry">Jewelry</Link>
        <Link to="shop/electronics">Electronics</Link>
      </div>
      <div className="nav-bar__utility">
        <Link to="account">
          <SquareUserRound />
          <p>Account</p>
        </Link>
        <Link to="cart">
          <ShoppingCart />
          <p>Cart</p>
        </Link>
      </div>
    </div>
  );
}
