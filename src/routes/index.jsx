import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Register from "../components/Register";
import { useOutletContext } from "react-router-dom";

export default function Index() {
  return (
    <>
      <Hero />
      <Categories />
      <Register />
    </>
  );
}
