import { obtenerCategorias } from "@/services/categorias-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Categoria {
  id: string;
  nombre: string;
}

interface CategoriasState {
  categorias: Categoria[];
  loading: boolean;
  fetchCategorias: () => Promise<void>;
  setCategorias: (categorias: Categoria[]) => void;
}

export const useCategoriasStore = create<CategoriasState>()(
  devtools((set) => ({
    categorias: [],
    loading: false,

    fetchCategorias: async () => {
      set({ loading: true });
      try {
        const categorias = await obtenerCategorias();
        set({ categorias, loading: false });
      } catch (error) {
        console.error("Error al obtener categorías:", error);
        set({ loading: false });
      }
    },

    setCategorias: (categorias) => set({ categorias }),
  }))
);
