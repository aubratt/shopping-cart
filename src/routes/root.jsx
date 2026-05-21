import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getProducts } from "../products";
import AnnouncementBar from "../components/AnnouncementBar";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function Root() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const productsData = await getProducts(
          `https://fakestoreapi.com/products/`,
        );
        const categoryMap = {
          electronics: "electronics",
          jewelery: "jewelry",
          "men's clothing": "men",
          "women's clothing": "women",
        };
        const formattedProducts = productsData.map((product) => ({
          ...product,
          category: categoryMap[product.category] || product.category,
          reviews: [],
        }));

        setProducts(formattedProducts);
        setError(null);
      } catch (error) {
        setError(error.message);
        setProducts(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, [category]);

  return (
    <>
      <ScrollToTop />
      <AnnouncementBar />
      <NavBar category={category} />
      <Outlet
        context={{
          loading,
          setLoading,
          error,
          setError,
          products,
          setProducts,
          cart,
          setCart,
        }}
      />
      <Footer />
    </>
  );
}
