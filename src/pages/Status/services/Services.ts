import { IDataRow } from "../components/CustomTable";
import { IForms } from "../types/Types";

const baseUrl = process.env.REACT_APP_API_URL;

/**
 * Función encargada de guardar los productos
 * @param {token} - Token de autorización
 * @param {data} - Datos del formulario a guardar
 * @author Gustavo Zuluaga <zuluaga.gustavo@correounivalle.edu.co>
 * @version 1.0.0
 */
export const SaveStatus = async (
  token: string,
  data: IForms,
): Promise<any> => {
  const response = await fetch(`${baseUrl}/post-status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al guardar el estados');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de actualizar los productos
 * @param {token} - Token de autorización
 * @param {id} - ID del estados a actualizar
 * @param {data} - Datos del formulario a actualizar
 * @returns {Promise<any>} - Datos del estados actualizado
 */
export const UpdateStatus = async (
  token: string,
  id: number,
  data: IForms,
): Promise<any> => {
  const response = await fetch(`${baseUrl}/put-status/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al actualizar el estados');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de eliminar el estado del estados
 * @param {token} - Token de autorización
 * @param {id} - ID del estados a eliminar
 * @returns {Promise<any>} - Respuesta del servidor
 */
export const UpdateStatusState = async (
  token: string,
  id: number,
): Promise<any> => {
  const response = await fetch(`${baseUrl}/delete-statuse/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}), // Enviar un cuerpo vacío
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al eliminar el estados');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de obtener todos los Statuss
 * @param {token} - Token de autorización
 * @returns {Promise<IDataRow[]>} - Lista de Statuss
 */
export const GetStatusAll = async (
  token: string
): Promise<IDataRow[]> => {
  const response = await fetch(`${baseUrl}/get-status-all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al obtener todos los Statuss');
  }

  const data = await response.json();
  return data.data.status; // Asegúrate de acceder correctamente al array
};

/**
 * Función encargada de listar la configuración de los Statuss activos
 * @param {token} - Token de autorización
 * @returns {Promise<any>} - Lista de Statuss activos
 * @author Gustavo Zuluaga <zuluaga.gustavo@correounivalle.edu.co>
 * @version 1.0.0
 */
export const GetStatusActive = async (
  token: string
): Promise<any> => {
  const response = await fetch(`${baseUrl}/get-select-status`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al obtener Statuss activos');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de obtener un estados por ID
 * @param {token} - Token de autorización
 * @param {id} - ID del estados a obtener
 * @returns {Promise<any>} - Datos del estados
 */
export const GetStatusById = async (token: string, id: number):
Promise<any> => {
  const response = await fetch(`${baseUrl}/get-status-id/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al obtener el estados por ID');
  }

  return response.json(); // Convertir respuesta a JSON
};
