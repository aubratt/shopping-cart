import { ArrowRight } from "lucide-react";
import Categories from "../components/Categories";
import RegisterSection from "../components/Register";

export default function Index() {
  return (
    <>
      <div className="hero">
        <div className="hero__media"></div>
        <div className="hero__content">
          <h1>Products that suit your lifestyle.</h1>
          <h2>Now shipping to Midgard.</h2>
          <button>
            Shop All
            <ArrowRight strokeWidth={1.25} />
          </button>
        </div>
      </div>
      <Categories />
      <RegisterSection />
    </>
  );
}
