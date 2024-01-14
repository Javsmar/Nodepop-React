import { useEffect, useState } from "react";
import Button from "../../Button/Button";
import { getLatestProducts } from "./service";
import "./showAdvert.css"
import { Link } from "react-router-dom";

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
      {products.length ? (
        <ul className="ulShowproducts">

          {products.map(( {id, ...product }) => (
            <li className="listAdvert" key={id}>
              <Link to={`${id}`}>
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
