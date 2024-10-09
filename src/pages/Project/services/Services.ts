import { IDataRow } from "../components/CustomTable";
import { IForms } from "../types/Types";

const baseUrl = process.env.REACT_APP_API_URL;

/**
 * Función encargada de guardar los usuarios
 * @param {token} - Token de autorización
 * @param {data} - Datos del formulario a guardar
 * @author Gustavo Zuluaga <zuluaga.gustavo@correounivalle.edu.co>
 * @version 1.0.0
 */
export const SaveProject = async (
  token: string,
  data: IForms,
): Promise<any> => {
  const response = await fetch(`${baseUrl}/post-project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al guardar el usuario');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de actualizar los usuarios
 * @param {token} - Token de autorización
 * @param {id} - ID del estados a actualizar
 * @param {data} - Datos del formulario a actualizar
 * @returns {Promise<any>} - Datos del estados actualizado
 */
export const UpdateProject = async (
  token: string,
  id: number,
  data: IForms,
): Promise<any> => {
  const response = await fetch(`${baseUrl}/put-project/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al actualizar el usuario');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de eliminar el estado del usuario
 * @param {token} - Token de autorización
 * @param {id} - ID del estados a eliminar
 * @returns {Promise<any>} - Respuesta del servidor
 */
export const UpdateProjectState = async (
  token: string,
  id: number,
): Promise<any> => {
  const response = await fetch(`${baseUrl}/delete-project/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}), // Enviar un cuerpo vacío
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al eliminar el usuario');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de obtener todos los usuarios
 * @param {token} - Token de autorización
 * @returns {Promise<IDataRow[]>} - Lista de Statuss
 */
export const GetProjectAll = async (
  token: string
): Promise<IDataRow[]> => {
  const response = await fetch(`${baseUrl}/get-project-all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al obtener todos los usuarios');
  }

  const data = await response.json();
  return data.data.projectdata; // Asegúrate de acceder correctamente al array
};

/**
 * Función encargada de listar la configuración de los Usuarios activos
 * @param {token} - Token de autorización
 * @returns {Promise<any>} - Lista de Statuss activos
 * @author Gustavo Zuluaga <zuluaga.gustavo@correounivalle.edu.co>
 * @version 1.0.0
 */
export const GetProjectActive = async (
  token: string
): Promise<any> => {
  const response = await fetch(`${baseUrl}/get-select-project`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al obtener Usuarios activos');
  }

  return response.json(); // Convertir respuesta a JSON
};

/**
 * Función encargada de obtener un usuario por ID
 * @param {token} - Token de autorización
 * @param {id} - ID del usuario a obtener
 * @returns {Promise<any>} - Datos del usuario
 */
export const GetProjectById = async (token: string, id: number):
Promise<any> => {
  const response = await fetch(`${baseUrl}/get-project-id/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json(); // Manejo de errores
    throw new Error(errorData.message || 'Error al obtener el usuario por ID');
  }

  return response.json(); // Convertir respuesta a JSON
};
