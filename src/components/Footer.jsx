import { Link, useLocation } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

export default function Footer() {
  const iconSize = { height: 32.5, width: 32.5 };

  return (
    <div className="footer">
      <div className="footer__lists">
        <div className="footer__list">
          <div className="footer__heading">
            <h4>SHOP</h4>
          </div>
          <div className="footer__list-items">
            <Link to="shop/all" state={{ category: "all" }}>All</Link>
            <Link to="shop/men" state={{ category: "men's clothing" }}>Men</Link>
            <Link to="shop/women" state={{ category: "women's clothing" }}>Women</Link>
            <Link to="shop/jewelry" state={{ category: "jewelery" }}>Jewelry</Link>
            <Link to="shop/electronics" state={{ category: "electronics" }}>Electronics</Link>
          </div>
        </div>
        <div className="footer__list">
          <div className="footer__heading">
            <h4>HELP</h4>
          </div>
          <div className="footer__list-items">
            <Link to="help/contact">Contact</Link>
            <Link to="help/faq">FAQ</Link>
          </div>
        </div>
        <div className="footer__list">
          <div className="footer__heading">
            <h4>COMPANY</h4>
          </div>
          <div className="footer__list-items">
            <Link to="company/about">About</Link>
            <Link to="company/press">Press</Link>
            <Link to="company/news">News & Stories</Link>
            <Link to="company/terms">Terms of Service</Link>
            <Link to="company/privacy">Privacy</Link>
          </div>
        </div>
        <div className="footer__list">
          <div className="footer__heading">
            <h4>FOLLOW US</h4>
          </div>
          <div className="footer__list-icons">
            <SocialIcon
              url="https://instagram.com"
              bgColor="#2e2e2e"
              fgColor="#faedcd"
              style={iconSize}
              target="_blank"
            />
            <SocialIcon
              url="https://tiktok.com"
              bgColor="#2e2e2e"
              fgColor="#faedcd"
              style={iconSize}
              target="_blank"
            />
            <SocialIcon
              url="https://bsky.app"
              bgColor="#2e2e2e"
              fgColor="#faedcd"
              style={iconSize}
              target="_blank"
            />
            <SocialIcon
              url="https://x.com"
              bgColor="#2e2e2e"
              fgColor="#faedcd"
              style={iconSize}
              target="_blank"
            />
            <SocialIcon
              url="https://facebook.com"
              bgColor="#2e2e2e"
              fgColor="#faedcd"
              style={iconSize}
              target="_blank"
            />
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>Copyright 2026 Odinstore</p>
      </div>
    </div>
  );
}
