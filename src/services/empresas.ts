import api, { PaginatedResponse } from "./api";

export interface Empresa {
  id: string;
  nombre: string;
  nit: string;
  direccion: string;
  telefono: string;
  estado: boolean;
}

export const obtenerEmpresasPaginated = async (
  page = 0,
  size = 10,
  sortBy = "nombre",
  sortDirection = "asc"
): Promise<PaginatedResponse<Empresa>> => {
  const response = await api.get("/empresas", {
    params: { page, size, sortBy, sortDirection },
  });
  return response.data;
};

export const obtenerEmpresas = async (): Promise<
  PaginatedResponse<Empresa>
> => {
  const response = await api.get("/empresas");
  return response.data;
};

export const crearEmpresa = async (
  empresa: Omit<Empresa, "id" | "estado">
): Promise<{ message: string; id: string }> => {
  const response = await api.post("/empresas", empresa);
  return response.data;
};

export const actualizarEmpresa = async (
  id: string,
  empresa: Partial<Omit<Empresa, "id">>
): Promise<{ message: string }> => {
  const response = await api.patch(`/empresas/${id}`, empresa);
  return response.data;
};

export const deshabilitarEmpresa = async (
  id: string
): Promise<{ message: string }> => {
  const response = await api.patch(`/empresas/${id}/disable`);
  return response.data;
};
