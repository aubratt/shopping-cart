import Hero from "../components/Hero";
import Categories from "../components/Categories";
import RegisterPromo from "../components/RegisterPromo";
import { useOutletContext } from "react-router-dom";

export default function Index() {
  return (
    <div className="index">
      <Hero />
      <Categories />
      <RegisterPromo />
    </div>
  );
}
