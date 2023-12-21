import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <div>
      <Header />
      <main className="layout-main bordered">
        <Outlet />
      </main>
      <Footer className="layout-footer bordered" />
    </div>
  );
}

export default Layout;
