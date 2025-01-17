import api, { PaginatedResponse } from "./api";

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  estado: boolean;
  empresa: { id: string; nombre: string };
}

export const obtenerProductos = async (
  page = 0,
  size = 10,
  sortBy = "nombre",
  sortDirection = "asc"
): Promise<PaginatedResponse<Producto>> => {
  const response = await api.get("/productos", {
    params: { page, size, sortBy, sortDirection },
  });
  return response.data;
};

export const obtenerProductosPorEmpresa = async (
  empresaId: string,
  page = 0,
  size = 10,
  sortBy = "nombre",
  sortDirection = "asc"
): Promise<PaginatedResponse<Producto>> => {
  const response = await api.get(`/productos/empresa/${empresaId}`, {
    params: { page, size, sortBy, sortDirection },
  });
  return response.data;
};

export const crearProducto = async (
  producto: Omit<Producto, "id" | "estado">
): Promise<{ message: string; id: string }> => {
  const response = await api.post("/productos", producto);
  return response.data;
};

export const asociarCategorias = async (
  productoId: string,
  categoriaIds: string[]
): Promise<{ message: string }> => {
  const response = await api.post("/productos/categorias", {
    productoId,
    categoriaIds,
  });
  return response.data;
};
