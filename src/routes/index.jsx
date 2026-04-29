import { ArrowLeft, ArrowRight } from "lucide-react";
import Category1 from "../assets/images/category-1.jpg";
import Category2 from "../assets/images/category-2.jpg";
import Category3 from "../assets/images/category-3.jpg";

export default function Index() {
  return (
    <>
      <div className="hero">
        <div className="hero__media"></div>
        <div className="hero__content">
          <h1>Products that suit your lifestyle.</h1>
          <h2>Now shipping to Midgard.</h2>
          <button>
            Shop Now
            <ArrowRight strokeWidth={1.25} />
          </button>
        </div>
      </div>
      <div className="categories">
        <div className="categories__prev">
          <ArrowLeft />
        </div>
        <div className="categories__card">
          <img src={Category1} alt="" />
          <p>New</p>
        </div>
        <div className="categories__card">
          <img src={Category2} alt="" />
          <p>[Name] Sale</p>
        </div>
        <div className="categories__card">
          <img src={Category3} alt="" />
          <p>[Name] Collection</p>
        </div>
        <div className="categories__card">
          <img src={Category3} alt="" />
          <p>[Name] Collection</p>
        </div>
        <div className="categories__card hidden">
          <img src="" alt="" />
          <p>Men</p>
        </div>
        <div className="categories__card hidden">
          <img src="" alt="" />
          <p>Women</p>
        </div>
        <div className="categories__card hidden">
          <img src="" alt="" />
          <p>Jewelry</p>
        </div>
        <div className="categories__card hidden">
          <img src="" alt="" />
          <p>Electronics</p>
        </div>
        <div className="categories__next">
          <ArrowRight />
        </div>
      </div>
    </>
  );
}
