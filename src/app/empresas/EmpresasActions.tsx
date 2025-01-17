

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDialogContext } from "@/context/dialogsEmpresasProvider";

interface EmpresasActionsProps {
    role: "admin" | "externo";
}

const EmpresasActions: React.FC<EmpresasActionsProps> = ({ role }) => {
    const { openCreateDialog } = useDialogContext();

    if (role !== "admin") {
        return null;
    }

    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Empresas</h1>
            <Button onClick={openCreateDialog} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" /> Agregar Empresa
            </Button>
        </div>
    );
};

export default EmpresasActions;
