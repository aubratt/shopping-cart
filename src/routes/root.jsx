import { ShoppingCart, SquareUserRound } from "lucide-react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function Root() {
  return (
    <>
      <div className="announcement-bar">
        <p className="announcement-bar__text">
          Free shipping on orders over $100
          {/* Free returns and exchanges */}
          {/* Have a question? Customer service available 24/7 */}
        </p>
      </div>
      <div className="nav-bar">
        <div className="nav-bar__business">
          <a className="nav-bar__logo">ODINSTORE</a>
          <a>About</a>
          <a>Contact</a>
        </div>
        <div className="nav-bar__links">
          <a>Men</a>
          <a>Women</a>
          <a>Jewelry</a>
          <a>Electronics</a>
        </div>
        <div className="nav-bar__utility">
          <a>
            <SquareUserRound />
            <p>Account</p>
          </a>
          <a>
            <ShoppingCart />
            <p>Cart</p>
          </a>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
