import create from "zustand";
import { devtools } from "zustand/middleware";
import { obtenerEmpresas, obtenerEmpresasPaginated } from "@/services/empresas";

interface Empresa {
  id: string;
  nombre: string;
  nit: string;
  direccion: string;
  telefono: string;
  estado: boolean;
}

interface EmpresasState {
  empresas: Empresa[];
  totalPages: number;
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  fetchEmpresas: () => Promise<void>;
  fetchEmpresasPaginated: (
    page: number,
    size: number,
    sort: string,
    order: string
  ) => Promise<void>;
}

export const useEmpresasStore = create<EmpresasState>()(
  devtools((set) => ({
    empresas: [],
    totalPages: 1,
    loading: false,
    page: 0,
    setPage: (page) => set({ page }),
    fetchEmpresas: async () => {
      set({ loading: true });
      try {
        const data = await obtenerEmpresas();
        set({ empresas: data.content, totalPages: data.totalPages });
      } catch (error) {
        console.error("Error fetching empresas:", error);
      } finally {
        set({ loading: false });
      }
    },
    fetchEmpresasPaginated: async (
      page: number,
      size: number,
      sort: string,
      order: string
    ) => {
      set({ loading: true });
      try {
        const data = await obtenerEmpresasPaginated(page, size, sort, order);
        set({ empresas: data.content, totalPages: data.totalPages });
      } catch (error) {
        console.error("Error fetching empresas:", error);
      } finally {
        set({ loading: false });
      }
    },
  }))
);
