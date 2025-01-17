
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
import { useEmpresasStore } from "@/store/empresasStore";
import { Edit3, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Empresa } from "@/services/empresas";

interface EmpresasTableProps {
    showActions: boolean;
    onEdit?: (empresa: Empresa) => void;
    onDelete?: (empresa: Empresa) => void;
}

const EmpresasTable: React.FC<EmpresasTableProps> = ({ showActions, onEdit, onDelete }) => {
    const { empresas, totalPages, page, setPage } = useEmpresasStore();

    return (
        <div className="bg-white rounded-lg shadow">
            <Table>
                <TableCaption>Lista de empresas registradas</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>NIT</TableHead>
                        <TableHead>Dirección</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Estado</TableHead>
                        {showActions && <TableHead className="text-right">Acciones</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {empresas.map((empresa) => (
                        <TableRow key={empresa.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{empresa.id}</TableCell>
                            <TableCell>{empresa.nombre}</TableCell>
                            <TableCell>{empresa.nit}</TableCell>
                            <TableCell>{empresa.direccion}</TableCell>
                            <TableCell>{empresa.telefono}</TableCell>
                            <TableCell>
                                <Badge variant={empresa.estado ? "secondary" : "destructive"}>
                                    {empresa.estado ? "Activo" : "Inactivo"}
                                </Badge>
                            </TableCell>
                            {showActions && (
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        {onEdit && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <button
                                                            className="text-orange-600 hover:text-orange-700"
                                                            onClick={() => onEdit(empresa)}
                                                        >
                                                            <Edit3 className="h-5 w-5" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Editar</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                        {onDelete && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <button
                                                            className="text-red-600 hover:text-red-700"
                                                            onClick={() => onDelete(empresa)}
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Eliminar</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="py-4 px-6 border-t">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (page > 0) setPage(page - 1);
                                }}
                                className={`${page === totalPages - 1 ? 'pointer-events-none opacity-50' : ''
                                    }`} />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    isActive={index === page}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(index);
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
                                    if (page < totalPages - 1) setPage(page + 1);
                                }}
                                className={`${page === totalPages - 1 ? 'pointer-events-none opacity-50' : ''
                                    }`}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default EmpresasTable;
