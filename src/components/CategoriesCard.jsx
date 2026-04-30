export default function CategoriesCard({ category }) {
  return (
    <div className={"categories__card"}>
      <img src={category.src} alt={category.alt} />
      <p>{category.name}</p>
    </div>
  );
}
