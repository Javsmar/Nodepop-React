import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Layout from "../layout/layout";
import { getLatestProducts } from "./service";

const ShowProducts = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getLatestProducts().then((products) => setProducts(products));
  }, []);

  return (
    <Layout title="Nodepop Snikers" {...props}>
      <div className="showProducts">
        <h1>Snikers</h1>
        {/* <Button onClick={handleLogout}>Logout</Button> */}
        {products.length ? (
          <ul
            style={{ listStyle: "none", border: "2px solid blue", padding: 24 }}
          >
            {products.map((product) => (
              <li key={product.id}>
                <span>{product.content}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Button $variant="primary>">Publica tu producto</Button>
        )}
      </div>
    </Layout>
  );
};

export default ShowProducts;
