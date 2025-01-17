import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface InventarioState {
  empresaSeleccionada: string | null;
  categoriaSeleccionada: string | null;
  rowsPerPage: number;
  setEmpresaSeleccionada: (empresaId: string | null) => void;
  setCategoriaSeleccionada: (categoriaId: string | null) => void;
  setRowsPerPage: (rows: number) => void;
}

export const useInventarioStore = create<InventarioState>()(
  devtools((set) => ({
    empresaSeleccionada: null,
    categoriaSeleccionada: null,
    rowsPerPage: 10,

    setEmpresaSeleccionada: (empresaId) =>
      set({ empresaSeleccionada: empresaId }),

    setCategoriaSeleccionada: (categoriaId) =>
      set({ categoriaSeleccionada: categoriaId }),

    setRowsPerPage: (rows) => set({ rowsPerPage: rows }),
  }))
);
