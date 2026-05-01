import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";
import NavBar from "../components/NavBar";

export default function Root() {
  return (
    <>
      <AnnouncementBar />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
