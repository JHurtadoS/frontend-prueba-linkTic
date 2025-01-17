
"use client";

import React, { useEffect } from "react";
import Sidebar from "@/components/sidebar";
import { Navbar } from "@/components/ui/navbar";
import EmpresasTable from "./EmpresasTable";
import { useEmpresasStore } from "@/store/empresasStore";
import { useAuthInitialization } from "@/hooks/utils/useAuthInitialization";

const EmpresasUser: React.FC = () => {
    const { fetchEmpresasPaginated, page } = useEmpresasStore();

    useAuthInitialization();

    useEffect(() => {
        fetchEmpresasPaginated(page, 10, "nombre", "asc");
    }, [page, fetchEmpresasPaginated]);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Navbar />
                <main className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Empresas</h1>
                    <EmpresasTable showActions={false} />
                </main>
            </div>
        </div>
    );
};

export default EmpresasUser;

