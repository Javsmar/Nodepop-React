import { useEffect, useState } from "react";
import Button from "../../Button/Button";
import { getLatestProducts } from "./service";
import "./showAdvert.css"

const EmptyList = () => (
  <div className="tweetsPage-empty">
    <p>Be the first one!</p>
    <Button $variant="primary">Create tweet</Button>
  </div>
);

const AdvertPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getLatestProducts().then((products) => setProducts(products));
  }, []);

  return (
    <div className="showProducts">
      <h1>Snikers Jordan</h1>
      {/* <Button onClick={handleLogout}>Logout</Button> */}
      {products.length ? (
        <ul className="ulShowproducts">

          {products.map((product) => (
            <li className="listAdvert" key={product.id}>

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
