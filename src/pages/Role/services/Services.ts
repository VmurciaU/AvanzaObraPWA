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
export const SaveRole = async (
  token: string,
  data: IForms,
): Promise<any> => { // Cambiado a Promise<any> para reflejar la respuesta del API
  const response = await fetch(`${baseUrl}/post-withouttoken-role`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al guardar el rol');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de actualizar los productos
 * @param {token} - Token de autorización
 * @param {id} - ID del rol a actualizar
 * @param {data} - Datos del formulario a actualizar
 * @returns {Promise<any>} - Datos del rol actualizado
 */
export const UpdateRole = async (
  token: string,
  id: number,
  data: IForms,
): Promise<any> => { // Cambiado a Promise<any>
  const response = await fetch(`${baseUrl}/put-role/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al actualizar el rol');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de eliminar el estado del rol
 * @param {token} - Token de autorización
 * @param {id} - ID del rol a eliminar
 * @returns {Promise<any>} - Respuesta del servidor
 */
export const UpdateRoleState = async (
  token: string,
  id: number,
): Promise<any> => { // Cambiado a Promise<any>
  const response = await fetch(`${baseUrl}/delete-role/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}), // Enviar un cuerpo vacío
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al eliminar el rol');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de obtener todos los roles
 * @param {token} - Token de autorización
 * @returns {Promise<IDataRow[]>} - Lista de roles
 */
export const GetRoleAll = async (
  token: string
): Promise<IDataRow[]> => {
  const response = await fetch(`${baseUrl}/get-role-all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al obtener todos los roles');
  }

  const data = await response.json();
  return data.data.roles; // Asegúrate de acceder correctamente al array
};

/**
 * Función encargada de listar la configuración de los roles activos
 * @param {token} - Token de autorización
 * @returns {Promise<any>} - Lista de roles activos
 * @author Gustavo Zuluaga <zuluaga.gustavo@correounivalle.edu.co>
 * @version 1.0.0
 */
export const GetRoleActive = async (
  token: string
): Promise<any> => { // Cambiado a Promise<any>
  const response = await fetch(`${baseUrl}/get-select-role`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al obtener roles activos');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de obtener un rol por ID
 * @param {token} - Token de autorización
 * @param {id} - ID del rol a obtener
 * @returns {Promise<any>} - Datos del rol
 */
export const GetRoleById = async (token: string, id: number):
Promise<any> => { // Cambiado a Promise<any>
  const response = await fetch(`${baseUrl}/get-role-id/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al obtener el rol por ID');
  }

  return response.json(); // Convertir respuesta a JSON
};
