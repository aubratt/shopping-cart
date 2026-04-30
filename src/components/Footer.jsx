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
            <a>All</a>
            <a>Men</a>
            <a>Women</a>
            <a>Jewelry</a>
            <a>Electronics</a>
          </div>
        </div>
        <div className="footer__list">
          <div className="footer__heading">
            <h4>HELP</h4>
          </div>
          <div className="footer__list-items">
            <a>Contact</a>
            <a>FAQ</a>
          </div>
        </div>
        <div className="footer__list">
          <div className="footer__heading">
            <h4>COMPANY</h4>
          </div>
          <div className="footer__list-items">
            <a>About</a>
            <a>Press</a>
            <a>News & Stories</a>
            <a>Terms of Service</a>
            <a>Privacy</a>
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
