import { AxiosInstance } from "axios";
import { getAxiosInstance } from "../AxiosInstance";

let axiosInstance: AxiosInstance;
if (typeof window !== "undefined") {
  axiosInstance = getAxiosInstance();
}

/**
 * Función encargada de Traer la data del usuario
 * @author Gustavo Zuluaga <zuluaga.gustavo@correounivalle.edu.co>
 * @version 1.0.0
 *
 */
export const ValidateToken = async (
  token: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => new Promise((resolve, reject) => {
  // Uso del hook de useContext
  axiosInstance.get("/validate-token", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*"
    }
  }).then((response) => {
    resolve(response);
  }).catch((e) => {
    reject(e);
  });
});
