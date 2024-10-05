import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SidebarStore {
  isOpen: boolean;
  toggleSidebar: (isOpen: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isOpen: true, // Estado inicial
      toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'sidebar-storage', // Nombre de la clave en el almacenamiento local
      storage: createJSONStorage(() => localStorage) // Tipo de storage
    }
  )
);
