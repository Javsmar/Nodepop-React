import { useEffect, useRef, useState } from "react";
import "./newAdvert.css"
import Button from "../../Button/Button";
import { createAdvert } from "./serviceNewAdvert";
import { useNavigate } from "react-router-dom";


const validName = ({ name }) => name;
const validPrice = ({ price }) =>
  !isNaN(parseFloat(price)) && isFinite(price) && price >= 0;
const validTags = ({ tags }) => !!tags.length;


// Componente NewAdvertPage
function NewAdvertPage() {
  
  const[formData, setFormData] = useState({
    name: "",
    sale: true, // Compra / Venta
    tags: [],
    price: 0,
    photo: null,
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    sale: false,
    tags: false,
    price: false,
    photo: false,
  });

  const [adCreated, setAdCreated] = useState(null);

  const [error, setError] = useState(null);
  
  const availableTags = ["Nuevo", "Usado", "Oferta"];

  const navigate = useNavigate(); 

  const photoRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name === "photo") {
      photoRef.current = e.target.files[0];
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTagsChange = (selectedTags) => {
    setFormData({
      ...formData,
      tags: selectedTags,
    });
  };
  

  useEffect(() => {
    console.log("useEffect ejecutado");
    if (adCreated) {
      const timer = setTimeout(() => {
        setAdCreated(false);
        navigate("/AdvertPage");
      }, 3000);
      return () => clearTimeout(timer);
    }
  
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [adCreated, error, navigate]);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameValid = validName(formData);
    const priceValid = validPrice(formData);
    const tagsValid = validTags(formData);

    setFormErrors({
      name: !nameValid,
      price: !priceValid,
      tags: !tagsValid,
      photo: !photoRef.current, 
    });

    if (nameValid && priceValid && tagsValid && formData.photo) {
      try {
        const { photo, ...formDataWithoutPhoto } = formData;
        console.log('Formulario válido, enviar a la API:', formData);
        
        const response = await createAdvert({
          ...formDataWithoutPhoto,
          photo: photoRef.current, 
        });

        console.log("Respuesta de la API:", response);
        
        setAdCreated('Anucio creado exitosamente');
  

      } catch (error) {
        console.error("Error al crear el anuncio", error);
        console.log("Valor de adCreated:", adCreated);
        setError("Error al crear el anuncio");
      }
    } else {
      console.log("Formulario inválido");
    }
  };

  return (
    <div className="formNewAdvert">
      <h1>Nuevo Anuncio</h1>
      <form  className="formNew" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formErrors.name && <span>Este campo es requerido</span>}
        </div>

        <div>
          <label htmlFor="sale">Anuncio</label>
          <select
            id="sale"
            name="sale"
            value={formData.sale}
            onChange={handleInputChange}
          >
            <option value={false}>Compra</option>
            <option value={true}>Venta</option>
          </select>
          {formErrors.sale && <span>Este campo es requerido</span>}
        </div>

        <div>
          <label htmlFor="tags">Tags</label>
          <select
            id="tags"
            name="tags"
            multiple
            value={formData.tags}
            onChange={(e) => handleTagsChange(Array.from(e.target.selectedOptions, (option) => option.value))}
          >
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          {formErrors.tags && <span>Al menos un tag es requerido</span>}
        </div>

        <div>
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          {formErrors.price && <span>Ingrese un precio válido</span>}
        </div>

        <div>
          <label htmlFor="photo">Foto</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleInputChange}
          />
          
          {formErrors.photo && <span>Este campo es requerido</span>} 
        </div>

        <div className="buttonNewAdvert">
          <div>
            <Button type="submit" disabled={Object.values(formErrors).some((error) => error)}>
              Crear Anuncio
            </Button>
          </div>
        </div>
        {adCreated && <div className="success-message">{adCreated}</div>}
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default NewAdvertPage;



