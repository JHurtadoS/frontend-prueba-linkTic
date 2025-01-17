import api, { PaginatedResponse } from "./api";

export interface Orden {
  id: string;
  fecha: string;
  estado: boolean;
  clienteId: string;
}

export const obtenerOrdenes = async (
  page = 0,
  size = 10
): Promise<PaginatedResponse<Orden>> => {
  const response = await api.get("/ordenes", { params: { page, size } });
  return response.data;
};

export const cambiarEstadoOrden = async (
  id: string,
  estado: boolean
): Promise<{ message: string }> => {
  const response = await api.patch(`/ordenes/${id}`, { estado });
  return response.data;
};
