// Función para obtener el token almacenado en localStorage
export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Función para verificar si el usuario está logueado (es decir, si hay un token)
  export const isLoggedIn = () => {
    return getToken() !== null;
  };
  