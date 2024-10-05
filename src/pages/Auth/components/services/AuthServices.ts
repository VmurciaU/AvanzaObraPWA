const baseUrl = process.env.REACT_APP_API_URL;

/**
 * Función encargada de realizar el login, validando frente al backend
 *
 * @param {username} - Identificación del usuario el cual va a hacer login
 * @param {password} - Contraseña del usuario
 * @returns {Promise<any>} - Respuesta del servidor
 *
 * @author Gustavo Zuluaga <zuluaga.gustavo@correounivalle.edu.co>
 * @version 1.0.0
 */
export const DoLogin = async (
  username: string,
  password: string,
): Promise<any> => {
  try {
    const response = await fetch(`${baseUrl}/login`, { // Aquí se incluye baseUrl
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    });

    if (!response.ok) {
      // Manejo de errores si la respuesta no es 2xx
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al realizar el login');
    }

    return await response.json(); // Devolver la data de la respuesta
  } catch (error) {
    // Manejo de errores de conexión
    throw new Error('Error de conexión. Verifica tu conexión a internet.');
  }
};
