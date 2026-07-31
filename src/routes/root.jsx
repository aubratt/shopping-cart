import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import db from "../firebase";
import { getProducts } from "../products";

import AnnouncementBar from "../components/AnnouncementBar";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function Root() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useLocalStorage("products", null);
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useLocalStorage("cart", []);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

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
          price: product.price.toFixed(2),
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
      <NavBar cart={cart} currentUser={currentUser} />
      <Outlet
        context={{
          db,
          loading,
          setLoading,
          error,
          setError,
          products,
          setProducts,
          cart,
          setCart,
          currentUser,
          setCurrentUser,
        }}
      />
      <Footer />
    </>
  );
}
