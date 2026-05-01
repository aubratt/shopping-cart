import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__media"></div>
      <div className="hero__content">
        <h1>Products that suit your lifestyle.</h1>
        <h2>Now shipping to Midgard.</h2>
        <Link to="shop/all">
          <button>
            Shop All
            <ArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
}
