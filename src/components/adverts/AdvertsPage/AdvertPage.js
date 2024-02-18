// AdvertPage.js

import { useEffect, useState } from "react";
import Button from "../../Button/Button";
import { getLatestProducts } from "./service";
import "./showAdvert.css"
import { Link, NavLink, useLocation } from "react-router-dom";
import { setAuthorizationHeader } from "../../../api/client";
import storage from "../../../utils/storage";

const EmptyList = () => (
  <div className="tweetsPage-empty">
    <p>Articulo no encontrado crea un anuncio</p>
    <Button $variant="primary">
      <NavLink to="/AdvertPage/new">Crear anuncio</NavLink> 
    </Button>
  </div>
);

function AdvertPage() {
  const [products, setProducts] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [saleFilter, setSaleFilter] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const token = storage.get("auth");
    if (token) {
      setAuthorizationHeader(token);

      const filters = {};

      if (nameFilter) {
        filters.name = nameFilter;
      }

      if (saleFilter !== null) { 
        filters.sale = saleFilter; 
      }

      getLatestProducts(filters)
        .then((products) => {
          setProducts(products);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener los productos:", error);
          setIsLoading(false);
        });
    } else {
      console.error("Token no disponible");
    }
  }, []);

  const handleSearch = () => {
    setIsLoading(true);

    const filters = {};

    if (nameFilter) {
      filters.name = nameFilter;
    }

    if (saleFilter !== null) { 
      filters.sale = saleFilter; 
    }

    getLatestProducts(filters)
      .then((products) => {
        setProducts(products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="showProducts">
      <h1>Adverts</h1>
      <div className="filters">
        <h2>Filtros</h2>
        <input type="text" placeholder="Nombre" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        <select value={saleFilter === null ? "todos" : saleFilter ? "Venta" : "Compra"} onChange={(e) => setSaleFilter(e.target.value === "todos" ? null : e.target.value === "Venta")}> 
          <option value="todos">Todos</option>
          <option value="Venta">Venta</option>
          <option value="Compra">Compra</option>
        </select>
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {products.length ? (
            <ul className="ulShowproducts">
              {products.map(({ id, ...product }) => (
                <li className="listAdvert" key={id}>
                  <Link to={`/AdvertPage/${id}`}>
                    <div className="divAdverts jordan">
                      <img src={product.photo} alt="Product" />
                    </div>

                    <div className="divAdverts">
                      <strong>Name:</strong> {product.name}
                    </div>

                    <div className="divAdverts">
                      {product.sale ? (
                        <strong>Venta</strong>
                      ) : (
                        <strong>Compra</strong>
                      )}
                    </div>

                    <div className="divAdverts">
                      <strong>Price:</strong> {product.price}
                    </div>

                    <div className="divAdverts">
                      <strong>Tags:</strong> {product.tags.join(", ")}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyList />
          )}
        </>
      )}
    </div>
  );
}

export default AdvertPage;
