"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import { Navbar } from "@/components/ui/navbar";
import PopoverRowsSelector from "@/components/PopoverRowsSelector";
import { obtenerProductos, obtenerProductosPorEmpresa, Producto } from "@/services/productos";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { useInventarioStore } from "@/store/inventarioStore";
import ProductosTable from "./ProductosTable";
import ComboboxFiltro from "./FiltroInventario";
import { obtenerProductosPorCategoria } from "@/services/productos-categorias-service";
import ReporteInventario from "./ReporteInventario ";

export default function Inventario() {
    const [productos, setProductos] = React.useState<Producto[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [totalPages, setTotalPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(0);

    const rowsPerPage = useInventarioStore((state) => state.rowsPerPage);
    const actualEmpresa = useInventarioStore((state) => state.empresaSeleccionada);
    const actualCategoria = useInventarioStore((state) => state.categoriaSeleccionada);


    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])


    const fetchProductos = React.useCallback(async () => {
        setLoading(true);
        try {
            let data;
            if (actualEmpresa) {
                data = await obtenerProductosPorEmpresa(actualEmpresa, currentPage, rowsPerPage, "nombre", "asc");
            } else if (actualCategoria) {
                data = await obtenerProductosPorCategoria(actualCategoria);
            } else {
                data = await obtenerProductos(currentPage, rowsPerPage, "nombre", "asc");
            }
            setProductos(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }, [actualEmpresa, actualCategoria, currentPage, rowsPerPage]);

    useEffect(() => {
        fetchProductos();
    }, [currentPage, rowsPerPage, actualEmpresa, actualCategoria, fetchProductos]);


    console.log(productos)

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex flex-1 flex-col">
                <Navbar />
                <main className="p-6">
                    <div className="mb-6 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-900">Inventario</h1>
                        <div className="flex space-x-4 items-center">
                            <ComboboxFiltro type="categoria" label={"Categoria"} value={actualCategoria} />
                            <ComboboxFiltro type="empresa" label="Empresa" value={actualEmpresa} />
                            <PopoverRowsSelector />
                            {isClient && totalPages !== 0 ? <PDFDownloadLink
                                document={<ReporteInventario productos={productos} />}
                                fileName="reporte_inventario.pdf"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                <>
                                    {!loading ? "Exportar PDF" : "Generando PDF"}
                                </>
                            </PDFDownloadLink> : null}

                        </div>
                    </div>


                    <ProductosTable
                        productos={productos}
                        loading={loading}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </main>
            </div>
        </div>
    );
}
