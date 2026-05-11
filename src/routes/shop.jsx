import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getProducts } from "../products";
import { ChevronRight } from "lucide-react";

export default function Shop() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const category = location.state.category;
  const categoryUnformatted = getUnformattedCategory(category);
  const categoryHeading = capitalizeCategory(category);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        let productsData;
        if (category === "all")
          productsData = await getProducts(
            `https://fakestoreapi.com/products/`,
          );
        else
          productsData = await getProducts(
            `https://fakestoreapi.com/products/category/${categoryUnformatted}`,
          );
        setProductsFormatted(productsData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [category]);

  function setProductsFormatted(products) {
    const formatted = products.map((product) => {
      let category;
      if (product.category === "men's clothing") category = "men";
      if (product.category === "women's clothing") category = "women";
      if (product.category === "jewelery") category = "jewelry";
      if (product.category === "electronics") category = product.category;

      return { ...product, category: category };
    });

    setProducts(formatted);
  }

  function getUnformattedCategory(category) {
    if (category === "men") return "men's clothing";
    if (category === "women") return "women's clothing";
    if (category === "jewelry") return "jewelery";
    return category;
  }

  function handleSort(e) {
    const selected = e.target.value;
    const unsorted = [...products];

    if (selected === "price-low-to-high")
      setProducts(unsorted.sort((a, b) => a.price - b.price));
    if (selected === "price-high-to-low")
      setProducts(unsorted.sort((a, b) => b.price - a.price));
    if (selected === "rating-low-to-high")
      setProducts(unsorted.sort((a, b) => a.rating.rate - b.rating.rate));
    if (selected === "rating-high-to-low")
      setProducts(unsorted.sort((a, b) => b.rating.rate - a.rating.rate));
  }

  function capitalizeCategory(category) {
    return String(category).charAt(0).toUpperCase() + String(category).slice(1);
  }

  return (
    <div className="shop">
      <div className="shop__heading">
        <div className="shop__breadcrumbs">
          {category === "all" ? (
            <h1 className="shop__breadcrumb-category">All</h1>
          ) : (
            <>
              <Link
                to="/shop/all"
                state={{ category: "all" }}
                className="shop__breadcrumb-all">
                <h1>All</h1>
              </Link>
              <ChevronRight />
              <h1 className="shop__breadcrumb-category">{categoryHeading}</h1>
            </>
          )}
        </div>
        <div className="shop__sort">
          <p>Sort by</p>
          <select
            name="sort"
            id="sort"
            defaultValue="default"
            onChange={(e) => handleSort(e)}>
            <option value="default">Default</option>
            <option value="price-low-to-high">Price Low to High</option>
            <option value="price-high-to-low">Price High to Low</option>
            <option value="rating-low-to-high">Rating Low to High</option>
            <option value="rating-high-to-low">Rating High to Low</option>
          </select>
        </div>
      </div>

      {error && <p>{error}</p>}

      {loading && <p className="shop__loading">Loading...</p>}

      <div className="shop__products">
        {products &&
          products.map((product) => {
            const price = Number(product?.price).toFixed(2);
            return (
              <Link
                key={product?.id}
                to={`/product/${product.id}`}
                state={{ product: product }}>
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
