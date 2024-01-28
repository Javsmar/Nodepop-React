import { useEffect, useState } from "react";
import Button from "../../Button/Button";
import { getLatestProducts } from "./service";
import "./showAdvert.css"
import { Link, NavLink } from "react-router-dom";
import { setAuthorizationHeader } from "../../../api/client";
import storage from "../../../utils/storage";

const EmptyList = () => (
  <div className="tweetsPage-empty">
    <p>Be the first one!</p>
    <Button $variant="primary">
      <NavLink to="/AdvertPage/new">Create tweet</NavLink> 
    </Button>
  </div>
);

function AdvertPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = storage.get("auth")
    if(token) {
      setAuthorizationHeader(token);
      getLatestProducts().then((products) => setProducts(products));
    } else {
      console.error("Token no disponible");
    }
  }, []);

  return (
    <div className="showProducts">
      <h1>Snikers Jordan</h1>
      {products.length ? (
        <ul className="ulShowproducts">

          {products.map(( {id, ...product }) => (
            <li className="listAdvert" key={id}>
              <Link to={`/AdvertPage/${id}`}>
                <div className="divAdverts jordan">
                  <img src={product.photo} alt="Product" />
                </div>

                <div className="divAdverts">
                  <strong>Name:</strong> {product.name}
                </div>

                <div className="divAdverts">
                  <strong>Sale:</strong> {product.sale ? 'Yes' : 'No'}
                </div>

                <div className="divAdverts">
                  <strong>Price:</strong> {product.price}
                </div>

                <div className="divAdverts">
                  <strong>Tags:</strong> {product.tags.join(', ')}
                </div>
              </Link>

            </li>
          ))}

        </ul>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default AdvertPage;
