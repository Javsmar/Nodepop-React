import LoginPage from "./components/LoginPage/LoginPage";
import NewAdvertPage from "./components/adverts/newAdvertsPage/NewAdvertPage";
import Layout from "./components/layout/layout";
import { Routes, Route, Navigate } from "react-router-dom";
import AdvertPage from "./components/adverts/AdvertsPage/AdvertPage";
import Register from "./components/RegisterPage/RegisterPage"
import AdvertPageDetails from "./components/adverts/AdvertPageDetails";
import RequireAuth from "./components/LoginPage/components/RequireAuth";

function App() {
  
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />

      <Route path="/AdvertPage" element={<Layout />}>
        <Route index element={<AdvertPage />}/>
        <Route path=":advertId" element={<AdvertPageDetails />} />
        <Route
          path="new" 
          element={
            <RequireAuth>
              <NewAdvertPage />
            </RequireAuth>
          }
        />
      </Route> 
      
      <Route path="/" element={<Navigate to="/Advertpage" />} />
      <Route path="/404" element={<div>404 | Not Fount</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
      
    </Routes>
  );
}

export default App;
