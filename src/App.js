import LoginPage from "./components/LoginPage/LoginPage";
import NewAdvertPage from "./components/adverts/newAdvertsPage/NewAdvertPage";
import Layout from "./components/layout/layout";
import { Routes, Route, Navigate } from "react-router-dom";
import AdvertPage from "./components/adverts/AdvertsPage/AdvertPage";
import Register from "./components/RegisterPage/RegisterPage"
import AdvertPageDetails from "./components/adverts/AdvertPageDetails";
import RequireAuth from "./components/LoginPage/components/RequireAuth";
import { setAuthorizationHeader } from "./api/client";
import storage from "./utils/storage";
import { getLatestProducts } from "./components/adverts/AdvertsPage/service";
import { useEffect, useState } from "react";

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = storage.get("auth");
    if (token) {
      setAuthorizationHeader(token);
      getLatestProducts().then((products) => setProducts(products));
    } else {
      console.error("Token no disponible");
    }
  }, []);
  
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />

      <Route path="/AdvertPage" element={<Layout />}>
        <Route index element={<AdvertPage />}/>
        <Route path="/AdvertPage/:advertId" element={<AdvertPageDetails products={products}/>} />
        <Route
          path="new" 
          element={
            <RequireAuth>
              <NewAdvertPage />
            </RequireAuth>
          }
        />
      </Route> 
      
      <Route path="/" element={<Navigate to="/AdvertPage" />} />
      <Route path="/404" element={<div>404 | Not Fount</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
      
    </Routes>
  );
}

export default App;
