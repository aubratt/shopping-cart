import { useMemo, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Shop() {
  const { category } = useParams();
  const categoryCapitalized =
    String(category).charAt(0).toUpperCase() + String(category).slice(1);

  const { loading, error, products } = useOutletContext();
  const [sortMethod, setSortMethod] = useState("default");
  const displayedProducts = useMemo(() => {
    let result = [...products];

    if (category !== "all")
      result = result.filter((product) => product.category === category);

    if (sortMethod === "default") result.sort((a, b) => a.id - b.id);
    if (sortMethod === "price-lo-hi") result.sort((a, b) => a.price - b.price);
    if (sortMethod === "price-hi-lo") result.sort((a, b) => b.price - a.price);
    if (sortMethod === "rating-lo-hi")
      result.sort((a, b) => a.rating.rate - b.rating.rate);
    if (sortMethod === "rating-hi-lo")
      result.sort((a, b) => b.rating.rate - a.rating.rate);

    return result;
  }, [products, category, sortMethod]);

  return (
    <div className="shop">
      <div className="shop__heading">
        <div className="shop__breadcrumbs">
          {category === "all" ? (
            <h1 className="shop__breadcrumb-category">All</h1>
          ) : (
            <>
              <Link to="/shop/all" className="shop__breadcrumb-all">
                <h1>All</h1>
              </Link>
              <ChevronRight />
              <h1 className="shop__breadcrumb-category">
                {categoryCapitalized}
              </h1>
            </>
          )}
        </div>
        <div className="shop__sort">
          <p>Sort by</p>
          <select
            name="sort"
            id="sort"
            defaultValue="default"
            onChange={(e) => setSortMethod(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-lo-hi">Price Low to High</option>
            <option value="price-hi-lo">Price High to Low</option>
            <option value="rating-lo-hi">Rating Low to High</option>
            <option value="rating-hi-lo">Rating High to Low</option>
          </select>
        </div>
      </div>

      {error && <p>{error}</p>}

      {loading && <p className="shop__loading">Loading...</p>}

      <div className="shop__products">
        {products &&
          displayedProducts.map((product) => {
            const price = Number(product?.price).toFixed(2);
            return (
              <Link key={product?.id} to={`/product/${product.id}`}>
                <div className="shop__product">
                  <div className="shop__product-image">
                    <img src={product?.image} alt={product?.title} />
                  </div>
                  <div className="shop__product-details">
                    <div className="shop__product-title">
                      <p>{product?.title}</p>
                    </div>
                    <div className="shop__product-price-rating">
                      <p>${price}</p>
                      <p>
                        {product?.rating?.rate}/5 ({product?.rating?.count})
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
