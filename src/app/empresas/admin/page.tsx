
"use client";

import React, { useEffect } from "react";
import Sidebar from "@/components/sidebar";
import { Navbar } from "@/components/ui/navbar";

import { useEmpresasStore } from "@/store/empresasStore";
import { useAuthInitialization } from "@/hooks/utils/useAuthInitialization";
import { useDialogContext } from "@/context/dialogsEmpresasProvider";
import EmpresasActions from "../EmpresasActions";
import EmpresasDialogs from "../EmpresasDialogs";
import EmpresasTable from "../EmpresasTable";

const EmpresasAdmin: React.FC = () => {
    const { fetchEmpresasPaginated, page } = useEmpresasStore();
    const { openUpdateDialog, openDeleteDialog } = useDialogContext();

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
                    <EmpresasActions role="admin" />
                    <EmpresasTable
                        showActions={true}
                        onEdit={(empresa) => openUpdateDialog(empresa)}
                        onDelete={(empresa) => openDeleteDialog(empresa)}
                    />
                </main>
            </div>
            <EmpresasDialogs />
        </div>
    );
};

export default EmpresasAdmin;
