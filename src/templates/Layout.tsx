import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <Header />

      <main className="layout__main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
