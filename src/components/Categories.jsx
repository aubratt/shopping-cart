import { useState } from "react";
import CategoriesCard from "./CategoriesCard";

import { ArrowLeft, ArrowRight } from "lucide-react";
import All from "../assets/images/all.jpg";
import Men from "../assets/images/men.jpg";
import Women from "../assets/images/women.jpg";
import Jewelry from "../assets/images/jewelry.jpg";
import Electronics from "../assets/images/electronics.jpg";

export default function Categories() {
  class Category {
    constructor(path, name, src, alt) {
      this.id = crypto.randomUUID();
      this.path = path;
      this.name = name;
      this.src = src;
      this.alt = alt;
      this.visible = false;
    }
  }

  const all = new Category("all", "All", All);
  const men = new Category("men", "Men", Men);
  const women = new Category("women", "Women", Women);
  const jewelry = new Category("jewelry", "Jewelry", Jewelry);
  const electronics = new Category("electronics", "Electronics", Electronics);

  const [categories, setCategories] = useState([
    all,
    men,
    women,
    jewelry,
    electronics,
  ]);

  function initCards(cardCount) {
    let visibleCount = 0;

    categories.map((cat) => {
      if (cat.visible) visibleCount++;
    });

    if (visibleCount < cardCount) {
      const newCategories = categories.map((cat, index) => {
        if (index < cardCount) return { ...cat, visible: true };
        return cat;
      });

      setCategories(newCategories);
    }
  }

  function handleArrowClick(next) {
    const firstVisible = categories.find((cat) => cat.visible);
    const firstVisibleIndex = categories.indexOf(firstVisible);
    const lastVisible = categories
      .slice()
      .reverse()
      .find((cat) => cat.visible);
    const lastVisibleIndex = categories.indexOf(lastVisible);
    let newCategories;

    if (next) {
      newCategories = categories.map((cat, index) => {
        if (index === firstVisibleIndex) return { ...cat, visible: false };
        if (index === lastVisibleIndex + 1) return { ...cat, visible: true };
        return cat;
      });
    } else {
      newCategories = categories.map((cat, index) => {
        if (index === firstVisibleIndex - 1) return { ...cat, visible: true };
        if (index === lastVisibleIndex) return { ...cat, visible: false };
        return cat;
      });
    }

    setCategories(newCategories);
  }

  initCards(4);

  const leftDisabled = categories[0].visible;
  const rightDisabled = categories[categories.length - 1].visible;

  return (
    <div className="categories">
      <button
        onClick={() => handleArrowClick(false)}
        className="categories__prev"
        disabled={leftDisabled}>
        <ArrowLeft color={leftDisabled ? "gray" : "black"} />
      </button>

      {categories
        .filter((cat) => cat.visible === true)
        .map((cat) => {
          return <CategoriesCard key={cat.id} category={cat} />;
        })}

      <button
        onClick={() => handleArrowClick(true)}
        className="categories__next"
        disabled={rightDisabled}>
        <ArrowRight color={rightDisabled ? "gray" : "black"} />
      </button>
    </div>
  );
}
