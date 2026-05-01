import { Link } from "react-router-dom";

export default function CategoriesCard({ category }) {
  return (
    <Link to={`shop/${category.path}`} className={"categories__card"}>
      <img src={category.src} alt={category.alt} />
      <p>{category.name}</p>
    </Link>
  );
}
