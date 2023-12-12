
En el bloque return, estamos devolviendo el contenido del componente.
Hay un contenedor <div> con la clase App, que incluye un encabezado <h1> con el texto "NodePop".
Luego, hay una expresión condicional que renderiza 
<ShowProducts /> si el usuario ha iniciado sesión (isLogged es true).
Si el usuario no ha iniciado sesión, se muestra el componente de registro (<Register />)
si isRegister es true, de lo contrario, se muestra el componente de inicio de sesión (<LoginPage />).
Además, se pasa la función handleLogin como prop (onLogin) al componente de inicio de sesión.
