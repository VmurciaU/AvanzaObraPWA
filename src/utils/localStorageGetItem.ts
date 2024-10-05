/* eslint-disable no-console */
// Función para obtener un ítem del localStorage
export const localStorageGetItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage`, error);
    return null;
  }
};

// Función para remover un ítem del localStorage
export const localStorageRemoveItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage`, error);
  }
};

// Función para setear un ítem en el localStorage
export const localStorageSetItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage`, error);
  }
};
