"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Producto } from "@/services/productos";




interface ProductosTableProps {
    productos: Producto[];
    loading: boolean;
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const ProductosTable: React.FC<ProductosTableProps> = ({
    productos,
    loading,
    totalPages,
    currentPage,
    onPageChange,
}) => {
    return (
        <div className="bg-white rounded-lg shadow">
            <Table>
                <TableCaption>Lista de productos disponibles</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                        <TableHead className="text-right">Cantidad</TableHead>
                        <TableHead>Estado</TableHead>
                    </TableRow>
                </TableHeader>

                {loading ? (
                    <tbody>
                        <tr>
                            <td colSpan={7} className="text-center py-4">
                                <div className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12" />                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <TableBody>
                        {productos.length > 0 ? (
                            productos.map((producto) => (
                                <TableRow key={producto.id}>
                                    <TableCell>{producto.id}</TableCell>
                                    <TableCell>{producto.nombre}</TableCell>
                                    <TableCell>{producto.descripcion || "N/A"}</TableCell>
                                    <TableCell className="text-right">${producto.precio.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">{producto.stock}</TableCell>
                                    {/* <TableCell>{producto.categoria}</TableCell> */}
                                    <TableCell>
                                        <Badge variant={producto.estado ? "secondary" : "destructive"}>
                                            {producto.estado ? "Activo" : "Inactivo"}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-4">
                                    No se encontraron productos.
                                </td>
                            </tr>
                        )}
                    </TableBody>
                )}
            </Table>

            {!loading && (
                <div className="py-4 px-6 border-t">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 0) onPageChange(currentPage - 1);
                                    }}
                                />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        isActive={index === currentPage}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onPageChange(index);
                                        }}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
                                    }}
                                    className={`${currentPage === totalPages - 1 ? 'pointer-events-none opacity-50' : ''
                                        }`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default ProductosTable;
