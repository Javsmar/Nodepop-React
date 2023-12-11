import client, { setAuthorizationHeader, removeAuthorizationHeader } from './client';
import storage from '../utils/storage';

export const register = async (userData) => {
  try {
    const { accessToken } = await client.post('/api/auth/signup', userData);
    setAuthorizationHeader(accessToken);
    storage.set('auth', accessToken);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error('Error en el registro:', error.message);
    } else {
      console.error('Error en el registro:', 'Los datos ya están en uso.');
    }
    throw error;
  }
};


export const login = credentials => {
  return client.post('/api/auth/login', credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    storage.set('auth', accessToken);
  });
};

// Función para cerrar sesión
export const logout = () => {
  return Promise.resolve().then(() => {
    // Elimina el token de autorización y limpia el almacenamiento local
    removeAuthorizationHeader();
    storage.remove('auth');
  });
};
