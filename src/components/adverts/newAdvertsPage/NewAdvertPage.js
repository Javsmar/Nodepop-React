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
  
   // Estado para manejar los valores del formulario
  const[formData, setFormData] = useState({
    name: "",
    sale: true, // Compra / Venta
    tags: [],
    price: 0,
    photo: null,
  });

  // Estado para manejar las validaciones del formulario
  const [formErrors, setFormErrors] = useState({
    name: false,
    sale: false,
    tags: false,
    price: false,
    photo: false,
  });

  // Estado para marcar si el anuncio se creó exitosamente
  const [adCreated, setAdCreated] = useState(null);

  const [error, setError] = useState(null);
  

  // Objeto de tags disponibles (puedes cargarlo dinámicamente)
  const availableTags = ["Nuevo", "Usado", "Oferta"];

  const navigate = useNavigate(); 

  const photoRef = useRef(null);

  // Función para manejar el cambio de valores en el formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Si el campo es de tipo archivo (file), maneja la carga de la foto
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

  // Función para manejar el cambio en los tags
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
      }, 5000);
      return () => clearTimeout(timer);
    }
  
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [adCreated, error, navigate]);
  
   // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    const nameValid = validName(formData);
    const priceValid = validPrice(formData);
    const tagsValid = validTags(formData);

    // Actualizar estado de validaciones
    setFormErrors({
      name: !nameValid,
      price: !priceValid,
      tags: !tagsValid,
      photo: !photoRef.current, // Validación básica para la foto
    });

    // Si todas las validaciones son exitosas, realizar la lógica de envío (por ahora solo imprimir en consola)
    if (nameValid && priceValid && tagsValid && formData.photo) {
      try {
        const { photo, ...formDataWithoutPhoto } = formData;
        console.log('Formulario válido, enviar a la API:', formData);
        // Llamar a la función createAdvert para enviar los datos a la API
        const response = await createAdvert({
          ...formDataWithoutPhoto,
          photo: photoRef.current, // Usar la ref para la foto
        });

        // Imprimir resultado de la llamada a la API
        console.log("Respuesta de la API:", response);
        
        // Marcamos el anuncio como creado exitosamente
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
      <form onSubmit={handleSubmit}>
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
          {formData.photo && (
            <img
              src={URL.createObjectURL(formData.photo)}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
          )}
          {formErrors.photo && <span>Este campo es requerido</span>}
        </div>

        <Button type="submit" disabled={Object.values(formErrors).some((error) => error)}>
          Crear Anuncio
        </Button>
        {adCreated && <div className="success-message">{adCreated}</div>}
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default NewAdvertPage;



