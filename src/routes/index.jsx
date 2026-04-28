import { ArrowRight } from "lucide-react";

export default function Index() {
  return (
    <>
      <div className="hero-section">
        <div className="hero-section__media"></div>
        <div className="hero-section__content">
          <h1>Products that suit your lifestyle.</h1>
          <h2>Now shipping to Midgard.</h2>
          <button>Shop Now<ArrowRight strokeWidth={1.25} /></button>
        </div>
      </div>
    </>
  );
}
