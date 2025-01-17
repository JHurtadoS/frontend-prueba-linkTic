import api, { PaginatedResponse } from "@/services/api";

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  creadoEn: null;
  actualizadoEn: Date | null;
  estado: boolean;
}

export const obtenerCategorias = async (): Promise<Categoria[]> => {
  try {
    const response = (
      await api.get<PaginatedResponse<Categoria>>("/categorias")
    ).data.content;
    return response;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};
