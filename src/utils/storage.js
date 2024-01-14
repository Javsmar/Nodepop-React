const storage = {
  get(key) {
    const value = localStorage.getItem(key);

    // Verificar si el valor es "undefined" (cadena) y manejarlo
    if (value === 'undefined') {
      return undefined;
    }

    // Verificar si el valor es nulo o indefinido
    if (value == null) {
      return null;
    }

    return JSON.parse(value);
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

export default storage;