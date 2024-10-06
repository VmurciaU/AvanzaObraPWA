/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetUserById, UpdateUserState } from "../services/Services";

/**
 * Función encargada de obtener la información de un día festivo
 * @param token token para consultar la información del api
 * @param id id del día festivo
 * @returns data del día festivo
 */
const handleDataEdit = async (token: string, id: number) => {
  try {
    const response = await GetUserById(token, id);
    return response.users; // Ajuste para acceder a la respuesta correctamente
  } catch (error) {
    const err: any = error; // Cambié `await error` a `error`
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

/**
 * Función encargada de eliminar la información de un día festivo
 * @param token token para consultar la información del api
 * @param id id del día festivo
 * @returns data del día festivo
 */
const handleDataDelete = async (token: string, id: number) => {
  try {
    await UpdateUserState(token, id);

    return true;
  } catch (error) {
    const err: any = error; // Cambié `await error` a `error`  
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

export { handleDataEdit, handleDataDelete };
