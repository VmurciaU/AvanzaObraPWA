import { IDataRow } from "../components/CustomTable";
import { IForms } from "../types/Types";

const baseUrl = process.env.REACT_APP_API_URL;

/**
 * Función encargada de guardar los cargos
 * @param {token} - Token de autorización
 * @param {data} - Datos del formulario a guardar
 * @author Gustavo Zuluaga <zuluaga.gustavo@correounivalle.edu.co>
 * @version 1.0.0
 */
export const SaveCharge = async (
  token: string,
  data: IForms,
): Promise<any> => {
  const response = await fetch(`${baseUrl}/post-charge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al guardar el cargo');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de actualizar los cargos
 * @param {token} - Token de autorización
 * @param {id} - ID del cargo a actualizar
 * @param {data} - Datos del formulario a actualizar
 * @returns {Promise<any>} - Datos del estados actualizado
 */
export const UpdateCharge = async (
  token: string,
  id: number,
  data: IForms,
): Promise<any> => {
  const response = await fetch(`${baseUrl}/put-charge/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al actualizar el cargo');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de cambiar el estado del cargo
 * @param {token} - Token de autorización
 * @param {id} - ID del estados a eliminar
 * @returns {Promise<any>} - Respuesta del servidor
 */
export const UpdateChargeState = async (
  token: string,
  id: number,
): Promise<any> => {
  const response = await fetch(`${baseUrl}/delete-charge/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}), // Enviar un cuerpo vacío
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al eliminar el cargo');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de obtener todos los cargos
 * @param {token} - Token de autorización
 * @returns {Promise<IDataRow[]>} - Lista de cargos
 */
export const GetChargeAll = async (
  token: string
): Promise<IDataRow[]> => {
  const response = await fetch(`${baseUrl}/get-charge-all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al obtener todos los cargos');
  }

  const data = await response.json();
  return data.data.charges; // Asegúrate de acceder correctamente al array
};

/**
 * Función encargada de listar la configuración de los cargos activos
 * @param {token} - Token de autorización
 * @returns {Promise<any>} - Lista de cargos activos
 * @author Gustavo Zuluaga <zuluaga.gustavo@correounivalle.edu.co>
 * @version 1.0.0
 */
export const GetChargeActive = async (
  token: string
): Promise<any> => {
  const response = await fetch(`${baseUrl}/get-select-charge`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al obtener Cargos activos');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de obtener un estados por ID
 * @param {token} - Token de autorización
 * @param {id} - ID del estados a obtener
 * @returns {Promise<any>} - Datos del estados
 */
export const GetChargeById = async (token: string, id: number):
Promise<any> => {
  const response = await fetch(`${baseUrl}/get-charge-id/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al obtener el cargos por ID');
  }

  return response.json(); // Convertir respuesta a JSON
};
