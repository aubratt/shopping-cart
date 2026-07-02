import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);

  const firebaseConfig = {
    apiKey: "AIzaSyAV8Q35CTUxE8NPW4MvaMCN5miAAFLi9Qo",
    authDomain: "shopping-cart-dae1b.firebaseapp.com",
    projectId: "shopping-cart-dae1b",
    storageBucket: "shopping-cart-dae1b.firebasestorage.app",
    messagingSenderId: "472626085376",
    appId: "1:472626085376:web:7e2f7a4d4d02cf194062e5",
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
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
