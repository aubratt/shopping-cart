import { useState } from "react";
import CategoriesCard from "./CategoriesCard";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Category1 from "../assets/images/category-1.jpg";
import Category2 from "../assets/images/category-2.jpg";
import Category3 from "../assets/images/category-3.jpg";
import Category4 from "../assets/images/category-4.jpg";
import Category5 from "../assets/images/category-5.jpg";
import Category6 from "../assets/images/category-6.jpg";

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

  const category1 = new Category("new", "New", Category1);
  const category2 = new Category("sale", "Sale", Category2);
  const category3 = new Category("men", "Men", Category3);
  const category4 = new Category("women", "Women", Category4);
  const category5 = new Category("jewelry", "Jewelry", Category5);
  const category6 = new Category("electronics", "Electronics", Category6);

  const [categories, setCategories] = useState([
    category1,
    category2,
    category3,
    category4,
    category5,
    category6,
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
