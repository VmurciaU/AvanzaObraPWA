import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Thunks
import { clearLocalStorage, validateToken } from "./thunks/validateToken";

// Utils
import { localStorageGetItem } from "../utils/localStorageGetItem";

// Interfaz de los datos del usuario
export interface IUser {
  id:           number | null;
  name:         string;
  lastName:     string;
  email:        string;
  dni:          string;
  password:     string;
  birthdayDate: Date | null;
  state:        number | null;
  idRole:       number | null;
  role:         Role | null;
  token:        string;
  initializing: boolean;
  redirectTo:   string;
  isLoading:    boolean;
  goTo:         string,
}

export interface Role {
  id:        number;
  name:      string;
  state:     number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Date;
}

// Interfaz de las funciones del usuario
export interface IUserStore extends IUser {
    login: (userData: IUser) => void;
    logout: () => void;
    updateProfile: (profileData: Partial<IUser>) => void;
    setRedirectTo: (redirectTo: string) => void;
    setToken: (token: string) => void;
    validateToken: () => Promise<void>;
}

// Estado inicial del usuario
const initialState: IUser = {
  id: null,
  name: "",
  lastName: "",
  email: "",
  dni: "",
  password: "",
  birthdayDate: null,
  state: null,
  idRole: null,
  role: null,
  token: "",
  goTo: '',
  initializing: false,
  redirectTo: "/dashboard",
  isLoading: false
};

// Crear el store del usuario
export const useUserStore = create<IUserStore>()(
  // Persistir el store del usuario
  persist(
    // Definir las funciones del usuario
    (set, get) => ({
      ...initialState,

      // Funciones del usuario
      login: (userData: IUser) => set(() => ({ ...userData })),
      logout: () => {
        set(() => ({
          ...initialState,
          redirectTo: "/",
          initializing: false
        }));
      },
      updateProfile: (profileData: Partial<IUser>) => set((state: IUser) => ({ ...state, ...profileData })),
      setRedirectTo: (redirectTo: string) => set((state: IUser) => ({ ...state, redirectTo })),
      setToken: (userToken: string) => set((state: IUser) => ({ ...state, userToken })),

      validateToken: async () => {
        set({ isLoading: true }); // Estado de carga iniciado
        const { token } = get();
        if (!token) {
          set({ initializing: false, isLoading: false }); // Finaliza la carga si no hay token
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payload: any = await validateToken();

        if (payload) {
          const storedData = localStorageGetItem("user-storage");
          const parsedData = storedData ? JSON.parse(storedData) : {};
          const token = parsedData.state.token;
          set({
            email: payload.email,
            name: payload.name,
            lastName: payload.lastName,
            token: token,
            role: payload.roles,
            initializing: true,
            isLoading: false // Finaliza la carga exitosamente
          });
        } else {
          set({ token: "", initializing: false, redirectTo: "/", isLoading: false });
          clearLocalStorage();
        }
      }
    }),
    {
      name: "user-storage", // Nombre del storage
      storage: createJSONStorage(() => localStorage) // Tipo de storage
    }
  )
);