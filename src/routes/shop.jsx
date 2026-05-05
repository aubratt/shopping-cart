import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../products";

export default function Shop() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const category = location.state.category;
  let heading;
  if (category === "all") heading = "All";
  if (category === "men's clothing") heading = "Men";
  if (category === "women's clothing") heading = "Women";
  if (category === "jewelery") heading = "Jewelry";
  if (category === "electronics") heading = "Electronics";

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
            `https://fakestoreapi.com/products/category/${category}`,
          );
        setProducts(productsData);
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

  return (
    <div className="shop">
      <div className="shop__heading">
        <h1>{heading}</h1>
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
              <div key={product?.id} className="shop__product">
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
            );
          })}
      </div>
    </div>
  );
}
