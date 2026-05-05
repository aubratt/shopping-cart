import { Link } from "react-router-dom";

export default function CategoriesCard({ category }) {
  return (
    <Link to={`shop/${category.path}`} className={"categories__card"}>
      <div className="categories__card-image">
        <img src={category.src} alt={category.alt} />
      </div>
      <p>{category.name}</p>
    </Link>
  );
}
