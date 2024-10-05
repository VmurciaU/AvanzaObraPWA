import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Interfaz de los datos del header
export interface IHeaderState {
    stateMenuDrawer: boolean;
    drawerWidth: number;
}

// Interfaz de las funciones del header
export interface IHeaderStore extends IHeaderState {
    changeState: () => void;
    setState: (state: boolean) => void;
}

// Crear el store del header
const initialState: IHeaderState = {
  stateMenuDrawer: false,
  drawerWidth: 300
};

// Persistir el store del header
export const useHeaderStore = create<IHeaderStore>()(
  // Definir las funciones del header
  persist(
    // Definir las funciones del header
    (set) => ({
      ...initialState,

      // Funciones del usuario en el estado del menu
      changeState: () => set((state) => ({ ...state, stateMenuDrawer: !state.stateMenuDrawer })),
      setState: (state) => set(() => ({ stateMenuDrawer: state }))
    }),
    {
      name: "header-storage", // Nombre del storage
      storage: createJSONStorage(() => localStorage) // Tipo de storage
    }
  )
);