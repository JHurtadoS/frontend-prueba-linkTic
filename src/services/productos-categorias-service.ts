import api from "./api";
import { Producto } from "./productos";

export const obtenerProductosPorCategoria = async (
  categoriaId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ content: Producto[]; totalPages: any }> => {
  try {
    const response = await api.get(
      `/producto-categorias/categoria/${categoriaId}/productos`
    );
    console.log(response.data);

    const data = {
      content: response.data,
      totalPages: 0,
    };

    return data;
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    throw new Error(
      "No se pudieron obtener los productos. Intente nuevamente."
    );
  }
};
