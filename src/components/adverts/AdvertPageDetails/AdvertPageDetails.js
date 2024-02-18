import { useParams } from "react-router-dom";
import Content from "../../../components/layout/Content";

import '../newAdvertsPage/newAdvert.css'

function AdvertPageDetails({ products }) {
  const params = useParams();
  const advertId = params.advertId;

  // Encuentra el anuncio correspondiente en la lista de productos
  const advert = products.find((product) => product.id === advertId);

  return (
    <Content>
      <div className="details">
        <h2>Adverts Details</h2>
        {advert ? (
          <>
            <div className="photo">
              <img src={advert.photo} alt={advert.name} />
            </div>
            <div className="detailsproducts">
              <div className="products">Name: {advert.name}</div>
              <div className="products">Sale: {advert.sale ? 'Venta' : 'Compra'}</div>
              <div className="products">Price: {advert.price}</div>
              <div className="products">Tags: {advert.tags.join(', ')}</div>
            </div>
          </>
        ) : (
          <p>Anuncio no encontrado</p>
        )}
      </div>
    </Content>
  );
}

export default AdvertPageDetails;
