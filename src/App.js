import LoginPage from "./components/LoginPage/LoginPage";
import { useAuth } from "./components/auth/context";
import NewAdvertPage from "./components/adverts/newAdvertsPage/NewAdvertPage";
import Layout from "./components/layout/layout";
import { Routes, Route, Navigate } from "react-router-dom";
import AdvertPage from "./components/adverts/AdvertsPage/AdvertPage";
import Register from "./components/RegisterPage/RegisterPage"
import AdvertPageDetails from "./components/adverts/AdvertPageDetails";

function App() {
  const { isLogged } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />

      <Route path="/AdvertPage"
        element={
          <Layout>
            <AdvertPage />
          </Layout>
        } 
      />

      <Route path="/AdvertPage/:advertId"
        element={
          <Layout>
            <AdvertPageDetails />
          </Layout>
        } 
      />

      <Route path="AdvertPage/new"
        element={
          <NewAdvertPage />
        } 
      />

      <Route path="/" element={<Navigate to="/Advertpage" />} />
      <Route path="/404" element={<div>404 | Not Fount</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
      
    </Routes>
  );
}

export default App;




// isLogged ? (
//   <Layout>
//     <AdvertPage />
//     <NewAdvertPage />
//   </ Layout>
// ) : (
//   <LoginPage />
// );