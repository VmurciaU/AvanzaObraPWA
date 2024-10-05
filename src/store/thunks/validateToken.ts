import { jwtVerify } from "jose";

// Servicio para validar el token
import { ValidateToken } from "../../services/valideToken/ValidateToken";

import { localStorageGetItem, localStorageRemoveItem } from "../../utils/localStorageGetItem";

export const validateToken = async () => {
  try {
    const storedData = localStorageGetItem("user-storage");
    const parsedData = storedData ? JSON.parse(storedData) : {};
    const token = parsedData.state.token;

    if (token) {
      const response = await ValidateToken(token);
      if (response.data.code === 200) {
        let newToken = response.data.data.token;
        newToken = newToken.replace("Bearer ", "");
        
        // Se requiere el secreto utilizado para firmar el token
        const secret = new TextEncoder().encode('your-secret'); // Asegúrate de usar el secreto correcto
        const { payload } = await jwtVerify(newToken, secret);
        
        return payload; // Devuelve el contenido del payload
      }
    }
    return null;
  } catch (err) {
    console.error("Error - validateToken", err);
    return null;
  }
};

export const clearLocalStorage = () => {
  localStorageRemoveItem("email");
  localStorageRemoveItem("name");
  localStorageRemoveItem("lastName");
  localStorageRemoveItem("token");
  localStorageRemoveItem("role");
};
