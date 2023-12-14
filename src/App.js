import ShowProducts from "./components/products/ShowProducts";
import LoginPage from "./components/LoginPage/LoginPage";
import { useAuth } from "./components/auth/context";


function App() {
  const { isLogged } = useAuth();
  
  return (
    
    <div className="App">
      {isLogged ? (
        <> 
          <ShowProducts />
        </>
      ) : (
        <LoginPage  />
      )} 
    </div>
    
  );
}
export default App;
